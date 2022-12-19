<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221219203010 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE movie (id INT AUTO_INCREMENT NOT NULL, start_point_id INT DEFAULT NULL, destination_id INT DEFAULT NULL, end_point_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, season VARCHAR(255) NOT NULL, link_to_file VARCHAR(255) NOT NULL, difficulty VARCHAR(255) NOT NULL, INDEX IDX_1D5EF26FDF028890 (start_point_id), INDEX IDX_1D5EF26F816C6140 (destination_id), INDEX IDX_1D5EF26F196B5B2F (end_point_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, altitude INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE movie ADD CONSTRAINT FK_1D5EF26FDF028890 FOREIGN KEY (start_point_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE movie ADD CONSTRAINT FK_1D5EF26F816C6140 FOREIGN KEY (destination_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE movie ADD CONSTRAINT FK_1D5EF26F196B5B2F FOREIGN KEY (end_point_id) REFERENCES place (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movie DROP FOREIGN KEY FK_1D5EF26FDF028890');
        $this->addSql('ALTER TABLE movie DROP FOREIGN KEY FK_1D5EF26F816C6140');
        $this->addSql('ALTER TABLE movie DROP FOREIGN KEY FK_1D5EF26F196B5B2F');
        $this->addSql('DROP TABLE movie');
        $this->addSql('DROP TABLE place');
    }
}
