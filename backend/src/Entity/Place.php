<?php

namespace App\Entity;

use App\Repository\PlaceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PlaceRepository::class)]
class Place
{
    #[Groups(['place'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['place'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['place'])]
    #[Assert\NotBlank]
    #[ORM\Column]
    private ?int $altitude = null;

    #[Groups(['place'])]
    #[ORM\OneToMany(mappedBy: 'startPoint', targetEntity: Movie::class)]
    private Collection $moviesFromStartPoint;

    #[Groups(['place'])]
    #[ORM\OneToMany(mappedBy: 'destination', targetEntity: Movie::class)]
    private Collection $moviesToDestination;

    #[Groups(['place'])]
    #[ORM\OneToMany(mappedBy: 'endPoint', targetEntity: Movie::class)]
    private Collection $moviesToEndpoint;

    public function __construct()
    {
        $this->movies = new ArrayCollection();
        $this->moviesFromStartPoint = new ArrayCollection();
        $this->moviesToDestination = new ArrayCollection();
        $this->moviesToEndpoint = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAltitude(): ?int
    {
        return $this->altitude;
    }

    public function setAltitude(int $altitude): self
    {
        $this->altitude = $altitude;

        return $this;
    }

    /**
     * @return Collection<int, Movie>
     */
    public function getMoviesFromStartPoint(): Collection
    {
        return $this->moviesFromStartPoint;
    }

    public function addMoviesFromStartPoint(Movie $moviesFromStartPoint): self
    {
        if (!$this->moviesFromStartPoint->contains($moviesFromStartPoint)) {
            $this->moviesFromStartPoint->add($moviesFromStartPoint);
            $moviesFromStartPoint->setStartPoint($this);
        }

        return $this;
    }

    public function removeMoviesFromStartPoint(Movie $moviesFromStartPoint): self
    {
        if ($this->moviesFromStartPoint->removeElement($moviesFromStartPoint)) {
            // set the owning side to null (unless already changed)
            if ($moviesFromStartPoint->getStartPoint() === $this) {
                $moviesFromStartPoint->setStartPoint(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Movie>
     */
    public function getMoviesToDestination(): Collection
    {
        return $this->moviesToDestination;
    }

    public function addMoviesToDestination(Movie $moviesToDestination): self
    {
        if (!$this->moviesToDestination->contains($moviesToDestination)) {
            $this->moviesToDestination->add($moviesToDestination);
            $moviesToDestination->setDestination($this);
        }

        return $this;
    }

    public function removeMoviesToDestination(Movie $moviesToDestination): self
    {
        if ($this->moviesToDestination->removeElement($moviesToDestination)) {
            // set the owning side to null (unless already changed)
            if ($moviesToDestination->getDestination() === $this) {
                $moviesToDestination->setDestination(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Movie>
     */
    public function getMoviesToEndpoint(): Collection
    {
        return $this->moviesToEndpoint;
    }

    public function addMoviesToEndpoint(Movie $moviesToEndpoint): self
    {
        if (!$this->moviesToEndpoint->contains($moviesToEndpoint)) {
            $this->moviesToEndpoint->add($moviesToEndpoint);
            $moviesToEndpoint->setEndPoint($this);
        }

        return $this;
    }

    public function removeMoviesToEndpoint(Movie $moviesToEndpoint): self
    {
        if ($this->moviesToEndpoint->removeElement($moviesToEndpoint)) {
            // set the owning side to null (unless already changed)
            if ($moviesToEndpoint->getEndPoint() === $this) {
                $moviesToEndpoint->setEndPoint(null);
            }
        }

        return $this;
    }
}
