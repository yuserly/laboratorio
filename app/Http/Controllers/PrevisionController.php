<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrevisionRequest;
use App\Http\Requests\UpdatePrevisionRequest;
use App\Models\Prevision;

class PrevisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePrevisionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePrevisionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Prevision  $prevision
     * @return \Illuminate\Http\Response
     */
    public function show(Prevision $prevision)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Prevision  $prevision
     * @return \Illuminate\Http\Response
     */
    public function edit(Prevision $prevision)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePrevisionRequest  $request
     * @param  \App\Models\Prevision  $prevision
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrevisionRequest $request, Prevision $prevision)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Prevision  $prevision
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prevision $prevision)
    {
        //
    }
}
