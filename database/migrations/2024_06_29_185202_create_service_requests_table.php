<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('service_id');
            $table->enum('status', ['Pending', 'Accepted', 'Completed', 'Cancelled'])->default('Pending');
            $table->timestamp('scheduled_time')->nullable();
            $table->timestamps();


            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('provider_id')->references('provider_id')->on('service_providers')->onDelete('cascade');
            $table->foreign('service_id')->references('service_id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_requests');
    }
}

