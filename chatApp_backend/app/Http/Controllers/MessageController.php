<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\Message;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function index(Chat $chat)
    {
        return $chat->messages()->with('user')->latest(50)->get()->reverse()->values();
    }

    public function store(Request $request, Chat $chat)
    {
        $message = $chat->messages()->create([
            'user_id' => $request->user()->id,
            // 'message' => $request->input('message'),
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return $message->load('user');
    }
}
