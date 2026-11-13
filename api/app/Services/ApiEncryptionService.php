<?php

namespace App\Services;

class ApiEncryptionService
{
    private string $key;
    private string $cipher = 'aes-256-cbc';

    public function __construct()
    {
        $this->key = (string) env('API_ENCRYPTION_KEY', '');
    }

    public function encrypt(mixed $data): string
    {
        $json = json_encode($data);
        $ivLength = openssl_cipher_iv_length($this->cipher);
        $iv = openssl_random_pseudo_bytes($ivLength);
        $encrypted = openssl_encrypt($json, $this->cipher, $this->key, 0, $iv);
        
        return base64_encode($iv . $encrypted);
    }

    public function decrypt(string $payload): mixed
    {
        $decoded = base64_decode($payload);
        $ivLength = openssl_cipher_iv_length($this->cipher);
        $iv = substr($decoded, 0, $ivLength);
        $encrypted = substr($decoded, $ivLength);
        $decrypted = openssl_decrypt($encrypted, $this->cipher, $this->key, 0, $iv);
        
        return json_decode((string) $decrypted, true);
    }
}