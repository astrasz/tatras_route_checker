<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends AbstractController
{

    private int $statusCode = 200;

    public function returnSuccessResponse(string|array $message = '', ?int $statusCode = null, array $headers = []): JsonResponse
    {
        if ($statusCode) {
            $this->setStatusCode($statusCode);
        }

        $data = [
            'status' => $this->getStatusCode(),
            'success' => 'true'
        ];

        if ($message) {
            $data['message'] = $message;
        }

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function returnFailureResponse(string | array $errors, int $statusCode, array $headers = []): JsonResponse
    {
        $this->setStatusCode($statusCode);
        $data = [
            'status' => $this->getStatusCode(),
            'success' => 'false',
            'errors' => $errors
        ];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;

        return $this;
    }
}
