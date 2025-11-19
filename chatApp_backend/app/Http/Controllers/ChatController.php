<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $chats = $request->user()
            ->chats()
            ->with('users')
            ->get();
            
        return ($chats->toArray());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $chat = Chat::create([
            'name' => $request->name,
        ]);

        $chat->users()->attach(array_merge([$request->user()->id], $request->user_ids));

        return $chat->load('users');
    }
}
