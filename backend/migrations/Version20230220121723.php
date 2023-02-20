<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230220121723 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movie ADD seter_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE movie ADD CONSTRAINT FK_1D5EF26F724E987 FOREIGN KEY (seter_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_1D5EF26F724E987 ON movie (seter_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movie DROP FOREIGN KEY FK_1D5EF26F724E987');
        $this->addSql('DROP INDEX IDX_1D5EF26F724E987 ON movie');
        $this->addSql('ALTER TABLE movie DROP seter_id');
    }
}
