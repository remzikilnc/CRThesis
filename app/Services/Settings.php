<?php namespace App\Services;

use App\Models\Setting;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class Settings {

    /**
     * @var Collection
     */
    private $all;

    /**
     * Laravel config values that should be included with settings.
     * (display name for client => laravel config key)
     *
     * @var array
     */
    private $configKeys = [
        'branding.site_name' => 'app.name',
    ];

    /**
     * Create a new settings service instance.
     */
    public function __construct()
    {
        $this->loadSettings();
    }

    /**
     * Get all application settings.
     *
     * @param bool $private
     * @return array
     */
    public function all(bool $private = false): array
    {
        $all = $this->all;
        // filter out private (server-only) settings
        if ( ! $private) {
            $all = $all->filter(function($setting) use($private) {
                return !$setting['private'];
            });
        }
        return $all->pluck('value', 'name')->toArray();
    }

    /**
     * @param string|int|null $default
     *
     * @return mixed
     */
    public function get(string $key, $default = null)
    {
        $value = $default;

        if ($setting = $this->find($key)) {
            $value = $setting['value'];
        }

        return is_string($value) ? trim($value) : $value;
    }

    /**
     * Get a json setting by key and decode it.
     *
     * @param string $key
     * @param array|null $default
     * @return array
     */
    public function getJson($key, $default = null) {
        $value = $this->get($key, $default);
        if ( ! is_string($value)) return $value;
        return json_decode($value, true);
    }

    /**
     * Check is setting with specified key exists.
     *
     * @param string $key
     * @return bool
     */
    public function has($key)
    {
        return ! is_null($this->find($key));
    }

    /**
     * Set single setting. Does not persist in database.
     *
     * @param string $key
     * @param mixed $value
     * @param bool $private
     *
     * @return void
     */
    public function set($key, $value, $private = false)
    {
        $this->all[$key] = ['name' => $key, 'value' => $value, 'private' => $private];
    }

    /**
     * Persist specified settings in database.
     *
     * @param array $data
     */
    public function save($data)
    {
        foreach ($data as $key => $value) {
            $setting = Setting::firstOrNew(['name' => $key]);
            $setting->value = ! is_null($value) ? $value : '';
            $setting->save();
            $this->set($key, $setting->value);
        }

        Cache::forget('settings.public');
    }


    private function find($key)
    {
        return Arr::get($this->all, $key);
    }

    /**
     * Load settings from database.
     */
    private function loadSettings()
    {
        $this->all = Cache::remember('settings.public', Carbon::now()->addDay(), function() {
            try {
                return Setting::select(['name', 'value', 'private'])->get()->mapWithKeys(function(Setting $setting) {
                    return [$setting->name => $setting->toArray()];
                });
            } catch (Exception $e) {
                return collect();
            }
        });

        // add config keys that should be included
        foreach ($this->configKeys as $clientKey => $configKey) {
            $this->set($clientKey, config($configKey));
        }
    }
}
