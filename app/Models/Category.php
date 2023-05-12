<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Staudenmeir\LaravelAdjacencyList\Eloquent\HasRecursiveRelationships;

class Category extends Model
{
    use HasRecursiveRelationships;

    protected $guarded = ['id'];

    public function getParentKeyName(): string
    {
        return 'parent_id';
    }

    public function getLocalKeyName(): string
    {
        return 'id';
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


    public function ancestorsWithNormalized(): \Staudenmeir\LaravelAdjacencyList\Eloquent\Relations\Ancestors
    {
        return $this->ancestors()->select();
    }

    public static function getAllAncestorsWithNormalized($categoryId): Model|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Builder|array|null
    {
        return self::with('ancestorsWithNormalized')->find($categoryId);
    }
}
