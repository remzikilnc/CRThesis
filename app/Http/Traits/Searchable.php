<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    use \Laravel\Scout\Searchable;

    public function scopeMysqlSearch(Builder $builder, string $query): Builder
    {
        $searchableFields = [];
        $searchableRelations = [];

        foreach ((new static())->toSearchableArray() as $field => $value) {
            if (!in_array($field, static::filterableFields())) {
                if (method_exists(static::class, $field)) {
                    $searchableRelations[] = $field;
                } else {
                    $searchableFields[] = $field;
                }
            }
        }

        $builder->matches($searchableFields, $query);

        foreach ($searchableRelations as $relation) {
            $builder->orWhereHas($relation, function (Builder $q) use ($query) {
                $q->mysqlSearch($query);
            });
        }

        return $builder;
    }

    public function scopeMatches(
        Builder $builder,
        array   $columns,
        string  $value
    ): Builder
    {
        $value = "%$value%";
        $colCount = count($columns);
        foreach ($columns as $key => $column) {
            $bool = $colCount === $key - 1 || $key === 0 ? 'and' : 'or';
            $builder->where($column, 'like', $value, $bool);
        }

        return $builder;
    }

    public function getSearchableValues(): array
    {
        $searchableValues = [];
        foreach ($this->toSearchableArray() as $key => $value) {
            if (!in_array($key, self::filterableFields())) {
                $searchableValues[] = $value;
            }
        }
        return $searchableValues;
    }

    public static function getSearchableKeys($skipRelations = false): array
    {
        $searchableKeys = [];
        foreach ((new static())->toSearchableArray() as $key => $value) {
            if (
                !in_array($key, static::filterableFields()) &&
                (!$skipRelations || !method_exists(static::class, $key))
            ) {
                $searchableKeys[] = $key;
            }
        }

        return $searchableKeys;
    }
}
