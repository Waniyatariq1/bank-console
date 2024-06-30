#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful, Remaining balance $${this.balance}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful, Remaining balance $${this.balance}`);
    }
    checkBalance() {
        console.log(`Current balance $${this.balance}`);
    }
}
class Customer {
    firstNam;
    lastName;
    gender;
    age;
    phoneNumber;
    account;
    constructor(firstName, lastName, gender, age, phoneNumber, account) {
        this.firstNam = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(1011, 500),
    new BankAccount(1012, 2000),
    new BankAccount(1013, 3000),
];
const customers = [
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
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accontNumber);
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
        }
        else {
            console.log("Invalid account number, Please try again");
        }
    } while (true);
}
service();
