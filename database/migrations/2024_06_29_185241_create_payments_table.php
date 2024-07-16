<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->unsignedBigInteger('request_id');
            $table->decimal('amount', 8, 2);
            $table->enum('payment_status', ['Pending', 'Completed', 'Failed'])->default('Pending');
            $table->string('payment_method');
            $table->timestamps();



            $table->foreign('request_id')->references('request_id')->on('service_requests')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}

