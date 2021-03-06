<?php

namespace App\Jobs;

use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendDefault extends Job implements ShouldQueue{

	use InteractsWithQueue, SerializesModels;

	private $user, $sender, $event, $lines, $get_line, $participant_line, $rsvp_token, $subject;

	public function __construct($user, $sender, $event, $lines, $get_line, $participant_line, $rsvp_token, $subject){

		$this->user = $user;
		$this->sender = $sender;
		$this->event = $event;
		$this->lines = $lines;
		$this->get_line = $get_line;
		$this->participant_line = $participant_line;
		$this->rsvp_token = $rsvp_token;
		$this->subject = $subject;

	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle(){

		$user = $this->user;
		$subject = $this->subject;
		Mail::send('emails.default', array(
			'user' => $this->user,
			'sender' => $this->sender,
			'event' => $this->event,
			'lines' => $this->lines,
			'line' => $this->get_line === true ? $this->participant_line : null,
			'rsvp_token' => $this->rsvp_token
		), function($message)use($user, $subject){
			$message->from('events@teamsrit.com', 'TeamsRIt');
			$message->to($user->email);
			$message->subject($subject);
		});

	}

}