<?php

namespace App\Services;

use InvalidArgumentException;
use JsonException;
use RuntimeException;

class ApiEncryptionService
{
    private string $key;

    private string $cipher;

    private int $nonceLength;

    private int $tagLength;

    /**
     * Initialize encryption configuration.
     */
    public function __construct()
    {
        $encodedKey = config('api-encryption.key');

        $this->cipher = config('api-encryption.cipher', 'aes-256-gcm');

        $this->nonceLength = (int) config('api-encryption.nonce_length', 12);

        $this->tagLength = (int) config('api-encryption.tag_length', 16);

        if ($this->cipher !== 'aes-256-gcm') {
            throw new RuntimeException('Unsupported API encryption cipher.');
        }

        if (!is_string($encodedKey) || $encodedKey === '') {
            throw new RuntimeException('API encryption key is not configured.');
        }

        $decodedKey = base64_decode($encodedKey, true);

        if ($decodedKey === false || strlen($decodedKey) !== 32) {
            throw new RuntimeException(
                'API encryption key must be a valid Base64-encoded 32-byte key.'
            );
        }

        if ($this->nonceLength !== 12 || $this->tagLength !== 16) {
            throw new RuntimeException('Invalid AES-256-GCM configuration.');
        }

        $this->key = $decodedKey;
    }

    /**
     * Encrypt data using AES-256-GCM.
     */
    public function encrypt(mixed $data): string
    {
        try {
            $json = json_encode($data, JSON_THROW_ON_ERROR);

            // Generate a unique nonce for every encryption.
            $nonce = random_bytes($this->nonceLength);

            $tag = '';

            $encrypted = openssl_encrypt(
                $json,
                $this->cipher,
                $this->key,
                OPENSSL_RAW_DATA,
                $nonce,
                $tag,
                '',
                $this->tagLength
            );

            if ($encrypted === false || strlen($tag) !== $this->tagLength) {
                throw new RuntimeException('API encryption failed.');
            }

            // Build the encrypted payload structure.
            $payload = [
                'version' => 1,
                'nonce' => base64_encode($nonce),
                'tag' => base64_encode($tag),
                'ciphertext' => base64_encode($encrypted),
            ];

            return base64_encode(
                json_encode($payload, JSON_THROW_ON_ERROR)
            );

        } catch (JsonException $exception) {
            throw new RuntimeException(
                'Unable to encode API encryption payload.',
                0,
                $exception
            );
        }
    }

    /**
     * Decrypt and authenticate an AES-256-GCM payload.
     */
    public function decrypt(string $payload): mixed
    {
        if ($payload === '') {
            throw new InvalidArgumentException('Encrypted payload is empty.');
        }

        // Decode the outer Base64 payload.
        $decoded = base64_decode($payload, true);

        if ($decoded === false) {
            throw new InvalidArgumentException('Invalid encrypted payload.');
        }

        try {
            $envelope = json_decode(
                $decoded,
                true,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (JsonException $exception) {
            throw new InvalidArgumentException(
                'Invalid encrypted payload structure.',
                0,
                $exception
            );
        }

        if (
            !is_array($envelope) ||
            ($envelope['version'] ?? null) !== 1 ||
            !isset(
                $envelope['nonce'],
                $envelope['tag'],
                $envelope['ciphertext']
            ) ||
            !is_string($envelope['nonce']) ||
            !is_string($envelope['tag']) ||
            !is_string($envelope['ciphertext'])
        ) {
            throw new InvalidArgumentException('Invalid encrypted payload structure.');
        }

        // Decode individual encrypted components.
        $nonce = base64_decode($envelope['nonce'], true);
        $tag = base64_decode($envelope['tag'], true);
        $ciphertext = base64_decode($envelope['ciphertext'], true);

        if (
            $nonce === false ||
            $tag === false ||
            $ciphertext === false ||
            strlen($nonce) !== $this->nonceLength ||
            strlen($tag) !== $this->tagLength ||
            $ciphertext === ''
        ) {
            throw new InvalidArgumentException('Invalid encrypted payload components.');
        }

        // Authenticate and decrypt.
        $decrypted = openssl_decrypt(
            $ciphertext,
            $this->cipher,
            $this->key,
            OPENSSL_RAW_DATA,
            $nonce,
            $tag,
            ''
        );

        if ($decrypted === false) {
            throw new InvalidArgumentException(
                'Encrypted payload authentication failed.'
            );
        }

        try {
            return json_decode(
                $decrypted,
                true,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (JsonException $exception) {
            throw new InvalidArgumentException(
                'Decrypted payload contains invalid JSON.',
                0,
                $exception
            );
        }
    }
}
