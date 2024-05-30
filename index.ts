#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.redBright("=").repeat(50));
console.log(chalk.greenBright.italic.bold("\n\tWelcome to 'Kaxh' Adventure Game Project\n"));
console.log(chalk.redBright("=").repeat(50));


class Hero {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
  decreaseHealth() {
    this.health -= 20;
  }
  increaseHealth() {
    this.health = 100;
  }
}

class Enemy {
  name: string;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
  decreaseHealth() {
    this.health -= 20;
  }
  increaseHealth() {
    this.health = 100;
  }
}

async function main() {
  const {heroName} = await inquirer.prompt([
    {
      type: "input",
      name: "heroName",
      message: chalk.magentaBright("\n \tEnter your Hero name:\n"),
    },
  ]);

  const {enemyType} = await inquirer.prompt([
    {
      type: "list",
      name: "enemyType",
      message:chalk.red("\n \tSelect the Enemy you fight with Hero\n"),
      choices: ["Alien", "Zombie", "Dracula", "Thanos"],
    },
  ]);

  const hero = new Hero(heroName);
  const enemy = new Enemy(enemyType);

  console.log(`\n \t${chalk.yellowBright.bold(enemy.name)} v/s ${chalk.cyanBright.bold(hero.name)}`);

  do {
    const {action} = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: chalk.yellowBright("\n \tChoose the battle type to perform Action\n"),
        choices: ["Attack", "Defend", "Kick", "Punch"],
      },
    ]);

    switch (action) {

        case "Defend":
            console.log(chalk.greenBright.italic(`\n \tWell defend ${hero.name}\n`));
            break;
        case "Attack":
        case "Kick":
        case "Punch":  
            const randomNum = Math.random();
            if (randomNum > 0.5) {
              hero.decreaseHealth();
              console.log(chalk.magenta(`${hero.name} health: ${hero.health}`));
              console.log(chalk.magenta(`${enemy.name} health: ${enemy.health}`));
              if (hero.health <= 0) {
                console.log(chalk.magentaBright.bold("\n \tYou loss! try again\n"));
                return
              }
            } else {
               
              enemy.decreaseHealth();
              console.log(chalk.magenta(`${hero.name} health: ${hero.health}`));
              console.log(chalk.magenta(`${enemy.name} health: ${enemy.health}`));
              if (enemy.health <= 0) {
                console.log(chalk.cyanBright.bold.italic("\n \tCongratulations! you won\n"));
                return
              }
            }
        break;
    }
  } while (true);
}

main();
