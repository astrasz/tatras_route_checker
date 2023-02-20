<?php

namespace App\Entity;

use App\Helper\MovieHelper;
use App\Repository\MovieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\ManyToOne(inversedBy: 'addedVideos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $seter = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'likedVideos')]
    private Collection $likers;

    #[ORM\OneToMany(mappedBy: 'target', targetEntity: Comment::class, orphanRemoval: true)]
    private Collection $comments;


    public function __construct()
    {
        $this->likers = new ArrayCollection();
        $this->comments = new ArrayCollection();
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

    public function getSeter(): ?User
    {
        return $this->seter;
    }

    public function setSeter(?User $seter): self
    {
        $this->seter = $seter;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getLikers(): Collection
    {
        return $this->likers;
    }

    public function addLiker(User $liker): self
    {
        if (!$this->likers->contains($liker)) {
            $this->likers->add($liker);
            $liker->addLikedVideo($this);
        }

        return $this;
    }

    public function removeLiker(User $liker): self
    {
        if ($this->likers->removeElement($liker)) {
            $liker->removeLikedVideo($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setTarget($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getTarget() === $this) {
                $comment->setTarget(null);
            }
        }

        return $this;
    }
}
