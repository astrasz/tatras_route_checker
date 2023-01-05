<?php

namespace App\DTO;

use App\DTO\BaseDTO;
use App\Entity\Place;
use App\Helpers\MovieHelper;
use Symfony\Component\Validator\Constraints as Assert;



class AddOrUpdateMovieDTO extends BaseDTO
{

    #[Assert\NotBlank]
    #[Assert\NotNull]
    private ?string $title;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    private ?string $linkToFile;


    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Choice(callback: [MovieHelper::class, 'getDifficultyLevels'])]
    private ?string $difficulty;

    private ?int $startPointId;

    private ?int $destinationId;

    private ?int $endPointId;

    private ?string $description;

    private ?bool $isWinter;



    /**
     * @return string|null
     */

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return bool|null
     */

    public function getIsWinter(): ?bool
    {
        return $this->isWinter;
    }

    public function setIsWinter(?string $isWinter): void
    {
        $this->isWinter = $isWinter;
    }

    /**
     * @return string|null
     */
    public function getLinkToFile(): ?string
    {
        return $this->linkToFile;
    }

    public function setLinkToFile(?string $linkToFile): void
    {
        $this->linkToFile = $linkToFile;
    }

    /**
     * @return int|null
     */
    public function getStartPointId(): ?int
    {
        return $this->startPointId;
    }

    public function setStartPoint(?int $startPointId): void
    {
        $this->startPointId = $startPointId;
    }

    /**
     * @return int|null
     */
    public function getDestinationId(): ?int
    {
        return $this->destinationId;
    }

    public function setDestination(?int $destinationId): void
    {
        $this->destinationId = $destinationId;
    }

    /**
     * @return int|null
     */
    public function getEndPointId(): ?int
    {
        return $this->endPointId;
    }

    public function setEndPointId(?int $endPointId): void
    {
        $this->endPointId = $endPointId;
    }

    /**
     * @return string|null
     */
    public function getDifficulty(): ?string
    {
        return $this->difficulty;
    }

    public function setDifficulty(string $difficulty): void
    {
        $this->difficulty = $difficulty;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }
}
