<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SanctumAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guard('sanctum')->guest()) {
            abort(401);
        }

        return $next($request);
    }
}
