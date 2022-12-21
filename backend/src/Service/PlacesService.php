<?php 

namespace App\Service;

use App\DTO\BaseDTO;
use App\Entity\Place;
use App\DTO\CreatePlaceDTO;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PlacesService
{
    private ManagerRegistry $doctrine;
    private ValidatorInterface $validator;
    private SerializerInterface $serializer;

    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator, SerializerInterface $serializer)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
        $this->serializer = $serializer;
    }

    public function createOrUpdate(CreatePlaceDTO $createPlaceDTO, Place $place=null): Place|array
    {
            $errors = $this->validator->validate($createPlaceDTO);
    
            if(count($errors) > 0) {
                $messages = [];
                foreach($errors as $error) {
                    $messages[$error->getPropertyPath()] = $error->getMessage();
                }
                return $messages;
            }
    
            $entityManager = $this->doctrine->getManager();
    
            if (!$place){
                $place = new Place();
            }
            $place->setName($createPlaceDTO->getName());
            $place->setAltitude($createPlaceDTO->getAltitude());
            $entityManager->persist($place);
            $entityManager->flush();

            return $place;
    }

    public function remove(Place $place): int
    {
        $id = $place->getId();
        $this->doctrine->getManager()->remove($place);
        $this->doctrine->getManager()->flush();

        return $id;
    }

    public function serializeToJson(array|Place $data, array $groups): string
    {
        return $this->serializer->serialize($data, 'json', ['groups' => $groups]);
    }

    public function createDTO(string $content, $className): BaseDTO
    {
        return $this->serializer->deserialize($content, $className, 'json');
    }
}