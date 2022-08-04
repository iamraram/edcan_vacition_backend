import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fs from 'fs'
import crypto from 'crypto'

const modules = {
    express,
    dotenv,
    mongoose,
    fs,
    crypto
}

export default modules