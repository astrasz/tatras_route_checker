<?php

namespace App\Helpers\Traits;

use App\DTO\BaseDTO;
use App\Entity\Movie;
use App\Entity\Place;
use Symfony\Component\Serializer\SerializerInterface;

trait SerializerTrait
{

    private $serializer;

    private function setSerializer(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function serializeToJson(array|Place|Movie $data, array $groups): string
    {
        return $this->serializer->serialize($data, 'json', ['groups' => $groups]);
    }

    public function createDTO(string $content, $className): BaseDTO
    {
        return $this->serializer->deserialize($content, $className, 'json');
    }
}
