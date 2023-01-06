<?php

namespace App\Entity;

use App\Helpers\MovieHelper;
use App\Repository\MovieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
class Movie
{
    #[Groups(['movie'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[Groups(['movie'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private string $title;

    #[Groups(['movie'])]
    #[ORM\Column(length: 255)]
    private bool $isWinter = false;

    #[Groups(['movie'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private string $linkToFile;

    #[Groups(['movie'])]
    #[Assert\Choice(callback: [MovieHelper::class, 'getDifficultyLevels'])]
    #[ORM\Column(length: 255)]
    private string $difficulty;

    #[Groups(['movie'])]
    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesFromStartPoint')]
    private ?Place $startPoint = null;

    #[Groups(['movie'])]
    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesToDestination')]
    private ?Place $destination = null;

    #[Groups(['movie'])]
    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesToEndpoint')]
    private ?Place $endPoint = null;

    #[Groups(['movie'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;


    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getIsWinter(): bool
    {
        return $this->isWinter;
    }

    public function setIsWinter(bool $isWinter): self
    {
        $this->isWinter = $isWinter;

        return $this;
    }

    public function getLinkToFile(): string
    {
        return $this->linkToFile;
    }

    public function setLinkToFile(string $linkToFile): self
    {
        $this->linkToFile = $linkToFile;

        return $this;
    }

    public function getStartPoint(): ?Place
    {
        return $this->startPoint;
    }

    public function setStartPoint(?Place $startPoint): self
    {
        $this->startPoint = $startPoint;

        return $this;
    }

    public function getDestination(): ?Place
    {
        return $this->destination;
    }

    public function setDestination(?Place $destination): self
    {
        $this->destination = $destination;

        return $this;
    }

    public function getEndPoint(): ?Place
    {
        return $this->endPoint;
    }

    public function setEndPoint(?Place $endPoint): self
    {
        $this->endPoint = $endPoint;

        return $this;
    }

    public function getDifficulty(): ?string
    {
        return $this->difficulty;
    }

    public function setDifficulty(string $difficulty): self
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
