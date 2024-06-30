#! /usr/bin/env node
import inquirer from "inquirer";

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `withdrawal of $${amount} successful, Remaining balance $${this.balance}`
      );
    } else {
      console.log("Insufficient balance");
    }
  }

  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful, Remaining balance $${this.balance}`
    );
  }
  checkBalance(): void {
    console.log(`Current balance $${this.balance}`);
  }
}

class Customer {
  firstNam: string;
  lastName: string;
  gender: string;
  age: number;
  phoneNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    phoneNumber: number,
    account: BankAccount
  ) {
    this.firstNam = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.account = account;
  }
}

const accounts: BankAccount[] = [
  new BankAccount(1011, 500),
  new BankAccount(1012, 2000),
  new BankAccount(1013, 3000),
];

const customers: Customer[] = [
  new Customer("Anaya", "Khan", "Female", 24, 2233344456, accounts[0]),
  new Customer("Emaan", "Ahmed", "Female", 20, 2233344457, accounts[1]),
  new Customer("Bilal", "Ahmed", "Male", 25, 2233344458, accounts[2]),
];

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accontNumber",
      type: "number",
      message: "Enter your account number",
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accontNumber
    );
    if (customer) {
      console.log(`\t\n welcome! ${customer.firstNam} ${customer.lastName}!\n   `);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "select an operation",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:",
          });
          customer.account.deposit(depositAmount.amount);
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount to deposit:",
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;
        case "Check Balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log("Exiting bank program....");
          return;
      }
    }else {
        console.log("Invalid account number, Please try again");     
    }
  } while (true);
}
service();
