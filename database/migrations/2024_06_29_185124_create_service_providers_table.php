<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceProvidersTable extends Migration
{
    public function up()
    {
        Schema::create('service_providers', function (Blueprint $table) {
            $table->id('provider_id');
            $table->unsignedBigInteger('user_id');
            $table->string('service_type');
            $table->boolean('availability')->default(true);
            $table->float('rating')->default(0);
            $table->timestamps();


            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('service_providers');
    }
}
