<?php

namespace App\DTO;

use App\DTO\BaseDTO;
use Symfony\Component\Validator\Constraints as Assert;

class CreatePlaceDTO extends BaseDTO
{
    #[Assert\NotBlank]
    #[Assert\NotNull]
    private ?string $name;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    private ?int $altitude;



    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return int|null
     */
    public function getAltitude(): ?int
    {
        return $this->altitude;
    }

    public function setAltitude(?int $altitude): void
    {
        $this->altitude = $altitude;
    }

}