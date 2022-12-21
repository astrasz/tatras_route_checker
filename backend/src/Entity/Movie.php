<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 255)]
    private string $season;

    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private string $linkToFile;

    #[Assert\Choice(callback: 'getDifficultyLevels')]
    #[ORM\Column(length: 255)]
    private string $difficulty;

    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesFromStartPoint')]
    private ?Place $startPoint = null;

    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesToDestination')]
    private ?Place $destination = null;

    #[ORM\ManyToOne(targetEntity: Place::class, inversedBy: 'moviesToEndpoint')]
    private ?Place $endPoint = null;


    public function __construct()
    {
    }

    public static function getDifficultyLevels(): array
    {
        return ['easy', 'normal', 'hard'];
    } 

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
    
    public function getSeason(): string
    {
        return $this->season;
    }

    public function setSeason(string $season): self
    {
        $this->season = $season;

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
}
