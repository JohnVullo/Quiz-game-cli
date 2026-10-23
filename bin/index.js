#!/usr/bin/env node

import { program } from 'commander'
import { showMainMenu } from '../src/lib/menu.js'


showMainMenu() 			       //Run the program	

program.parse(process.argv)    //Tells commander to process any command-line arguments passed into the program
