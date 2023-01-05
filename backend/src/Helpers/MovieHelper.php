<?php

namespace App\Helpers;


class MovieHelper
{
    public static function getDifficultyLevels(): array
    {
        return ['easy', 'normal', 'hard'];
    }
}
