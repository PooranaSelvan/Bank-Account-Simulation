// Template
let template = document.getElementById("template");

// Navbar
let navbar = document.querySelector("#navbar #menu");

// Auth
let swtichSignUpBtn = document.getElementById("switch-signup");
let switchLoginBtn = document.getElementById("switch-login");
let loginContainer = document.getElementById("login");
let signUpContainer = document.getElementById("signup");
let authContainer = document.getElementById("auth-page");
let logoutBtn = document.getElementById("logout-btn");
let loginBtn = document.getElementById("login-btn");
let signUpBtn = document.getElementById("signup-btn");
let loginName = document.getElementById("login-name");
let loginPass = document.getElementById("login-pass");
let signUpName = document.getElementById("signup-name");
let signUpPass = document.getElementById("signup-pass");
let loginErrorMessage = document.getElementById("login-error-message");
let signUpErrorMessage = document.getElementById("signup-error-message");

// Deposit
let checkDepositBtn = document.getElementById("check-deposit");
let depositCloseBtn = document.getElementById("deposit-close");
let depositContainer = document.getElementById("deposit-page");
let depositBtn = document.getElementById("deposit-btn");
let depositInput = document.getElementById("deposit-amount");
let depositMessage = document.getElementById("deposit-message");

// Balance
let checkBalanceBtn = document.getElementById("check-balance");
let balanceCloseBtn = document.getElementById("balance-close");
let balanceContainer = document.getElementById("balance-page");
let balanceOutputContainer = document.getElementById("balanceOutput");

// Withdraw
let checkWithdrawBtn = document.getElementById("check-withdraw");
let withdrawCloseBtn = document.getElementById("withdraw-close");
let withdrawContainer = document.getElementById("withdraw-page");
let withdrawBtn = document.getElementById("withdraw-btn");
let withdrawInput = document.getElementById("withdraw-amount");
let withdrawMessage = document.getElementById("withdraw-message");

// Transaction
let checkTransactionBtn = document.getElementById("check-transaction");
let transactionCloseBtn = document.getElementById("transaction-close");
let transactionContainer = document.getElementById("transaction-page");
let transactionOutput = document.getElementById("transactionOutput");

// Transfer Money
let checkTransferBtn = document.getElementById("check-transfer");
let transferBtn = document.getElementById("transfer-btn");
let transferContainer = document.getElementById("transfer-page");
let transferCloseBtn = document.getElementById("transfer-close");
let transferMessage = document.getElementById("transfer-message");
let transferMoney = document.getElementById("transfer-amount");
let transferAccount = document.getElementById("transfer-account");


let isLoggedIn = false;
let currentUser = null;


document.addEventListener("DOMContentLoaded", () => {
     let user = JSON.parse(localStorage.getItem("currentUser"));


     if(user === null){
          navbar.style.display = "none";
          isLoggedIn = false;
          authContainer.style.display = "flex";
          template.style.display = "none";
          return;
     } 

     // console.log(user);
     template.style.display = "flex";
     onLoadUser(user);
});

function onLoadUser(user){
     // console.log(user);
     currentUser = new Bank(user.name, user.password);
     currentUser.accountNumber = user.accountNumber;
     currentUser.balance = +user.balance;
     isLoggedIn = true;
     navbar.style.display = "flex";
     document.getElementById("account-name").innerText = `Name : ${currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1)}`;
     document.getElementById("account-number").innerText = `AccNo : ${currentUser.accountNumber}`;
     document.querySelector("#account-balance p").innerText = `Balance : ₹${currentUser.balance}`;
}


// Auth
switchLoginBtn.addEventListener("click", () => {
     loginContainer.style.display = "flex";
     signUpContainer.style.display = "none";
});
swtichSignUpBtn.addEventListener("click", () => {
     loginContainer.style.display = "none";
     signUpContainer.style.display = "flex";
});
// Login
loginBtn.addEventListener("click", () => {
     loginName.classList.remove("input-error");
     loginPass.classList.remove("input-error");

     if(!loginName.value){
          loginName.classList.add("input-error");
          return;
     }
     if(!loginPass.value){
          loginPass.classList.add("input-error");
          return;
     }

     let res = Bank.loginToAccount(loginName.value, loginPass.value);
     if(res){
          isLoggedIn = true;
          navbar.style.display = "flex";
          authContainer.style.display = "none";
          template.style.display = "flex";
     } else {
          isLoggedIn = false;
          loginErrorMessage.style.display = "flex";
          loginErrorMessage.style.color = "red";
          loginErrorMessage.innerText = "Invalid Credentials!";
     }

     loginName.value = "";
     loginPass.value = "";
});
// SignUp
signUpBtn.addEventListener("click", () => {
     signUpName.classList.remove("input-error");
     signUpPass.classList.remove("input-error");

     if(!signUpName.value){
          signUpName.classList.add("input-error");
          return;
     }
     if(!signUpPass.value){
          signUpPass.classList.add("input-error");
          return;
     }

     let user = new Bank(signUpName.value, signUpPass.value);
     let res = user.createAccount();
     if(res){
          navbar.style.display = "flex";
          authContainer.style.display = "none";
          template.style.display = "flex";
     } else {
          loginErrorMessage.style.display = "flex";
          signUpErrorMessage.style.color = "red";
          signUpErrorMessage.innerText = "User Already Exists!";
     }

     signUpName.value = "";
     signUpPass.value = "";
});
// Logout
logoutBtn.addEventListener("click", () => {
     isLoggedIn = false;
     navbar.style.display = "none";
     currentUser = null;
     localStorage.removeItem("currentUser");
     balanceContainer.style.display = "none";
     depositContainer.style.display = "none";
     withdrawContainer.style.display = "none";
     transactionContainer.style.display = "none";
     template.style.display = "none";
     authContainer.style.display = "flex";
     transferContainer.style.display = "none";
     loginName.value = "";
     loginPass.value = "";
     signUpName.value = "";
     signUpPass.value = "";
     signUpErrorMessage.innerText = "";
     loginErrorMessage.innerText = "";
});



// Balance
checkBalanceBtn.addEventListener("click", () => {
     balanceContainer.style.display = "flex";
     depositContainer.style.display = "none";
     withdrawContainer.style.display = "none";
     transactionContainer.style.display = "none";
     authContainer.style.display = "none";
     template.style.display = "none";
     transferContainer.style.display = "none";

     let balance = Bank.checkBalance();

     if(balance === 0){
          balanceOutputContainer.style.color = "red";
          balanceOutputContainer.innerText = "₹O \nStart Depositing Amount!";
     } else {
          balanceOutputContainer.style.color = "black";
          balanceOutputContainer.innerText = `Your Balance Amount is ₹${balance}`;
     }
});
balanceCloseBtn.addEventListener("click", () => {
     balanceContainer.style.display = "none";
     template.style.display = "flex";
});


// Deposit
checkDepositBtn.addEventListener("click", () => {
     depositContainer.style.display = "flex";
     balanceContainer.style.display = "none";
     withdrawContainer.style.display = "none";
     transactionContainer.style.display = "none";
     template.style.display = "none";
     authContainer.style.display = "none";
     transferContainer.style.display = "none";
});
depositCloseBtn.addEventListener("click", () => {
     // console.log("clicking");
     depositContainer.style.display = "none";
     depositMessage.style.display = "none";
     template.style.display = "flex";
     depositInput.value = "";
     depositMessage.innerText = "";
});
depositBtn.addEventListener("click", () => {
     if(!depositInput.value){
          depositMessage.style.display = "flex";
          depositMessage.style.color = "red";
          depositMessage.innerText = "Invalid Deposit Amount!";
          return;
     }

     if(depositInput.value > 100000){
          depositMessage.style.display = "flex";
          depositMessage.style.color = "red";
          depositMessage.innerText = "You can't transfer more than 1Lakhs at a time!";
          return;
     }

     if(currentUser.balance > 1000000){
          depositMessage.style.display = "flex";
          depositMessage.style.color = "red";
          depositMessage.innerText = "Contact Bank to Store More than 10 Lakhs!";
          return;
     }

     let res = Bank.deposit(+depositInput.value);

     depositMessage.style.display = "flex";
     
     if(res){
          depositMessage.style.color = "green";
          depositMessage.innerText = "Deposited Successfully!";
     } else {
          depositMessage.style.color = "red";
          depositMessage.innerText = "Invalid Deposit Amount!";
     }

     depositInput.value = "";
});


// Withdraw
checkWithdrawBtn.addEventListener("click", () => {
     withdrawContainer.style.display = "flex";
     depositContainer.style.display = "none";
     balanceContainer.style.display = "none";
     transactionContainer.style.display = "none";
     authContainer.style.display = "none";
     template.style.display = "none";
     transferContainer.style.display = "none";
});
withdrawCloseBtn.addEventListener("click", () => {
     withdrawContainer.style.display = "none";
     template.style.display = "flex";
     withdrawInput.value = "";
     withdrawMessage.innerText = "";
});
withdrawBtn.addEventListener("click", () => {
     if(!withdrawInput.value){
          withdrawMessage.style.display = "flex";
          withdrawMessage.style.color = "red";
          withdrawMessage.innerText = "Invalid Deposit Amount!";
          return;
     }

     if(withdrawInput.value < 500){
          withdrawMessage.style.display = "flex";
          withdrawMessage.style.color = "red";
          withdrawMessage.innerText = "Minimum Amount to Withdraw is ₹500!";
          return;
     }

     let res = Bank.withdraw(+withdrawInput.value);

     if(res){
          withdrawMessage.style.color = "green";
          withdrawMessage.innerText = "Withdrawn Successfully!";
     } else {
          withdrawMessage.style.color = "red";
          withdrawMessage.innerText = "Invalid Withdrawn Amount!";
     }

     withdrawInput.value = "";
});


// Transaction
checkTransactionBtn.addEventListener("click", () => {
     transactionContainer.style.display = "flex";
     depositContainer.style.display = "none";
     balanceContainer.style.display = "none";
     withdrawContainer.style.display = "none";
     authContainer.style.display = "none";
     template.style.display = "none";
     transferContainer.style.display = "none";

     let res = Bank.checkHistory();

     let currentTransactions = res.filter(ele => ele.accountNumber === currentUser.accountNumber);

     if (currentTransactions.length === 0) {
          transactionOutput.innerHTML = `<p class="no-transactions">There are no Transactions to Display!</p>`;
     } else {
          transactionOutput.innerHTML = currentTransactions.map(ele => `
          <div class="transaction-item ${ele.type.toLowerCase()}">
               <div class="type">
                   <span class="icon">${ele.type === 'deposit' ? '<i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i>' : (ele.type === "withdraw") ? '<i class="fa-solid fa-arrow-down" style="color: #ff0000;"></i>' : '<i class="fa-solid fa-money-bill-transfer" style="color: #FFD43B;"></i>'}</span>
                   <span><strong>${ele.type.charAt(0).toUpperCase() + ele.type.slice(1)}</strong></span>
               </div>
               <div class="amount">
                   ${ele.type === 'deposit' ? `+₹${ele.amount}` : `-₹${ele.amount}`}
               </div>
               <div class="date">
                   <p>${ele.date.split(",")[0]}</p>
                   <p>${ele.date.split(",")[1]}</p>
               </div>
          </div>`).join("");      
     }

});
transactionCloseBtn.addEventListener("click", () => {
     transactionContainer.style.display = "none";
     template.style.display = "flex";
});


// Transfer Money
checkTransferBtn.addEventListener("click", () => {
     transferContainer.style.display = "flex";
     transactionContainer.style.display = "none";
     depositContainer.style.display = "none";
     balanceContainer.style.display = "none";
     withdrawContainer.style.display = "none";
     authContainer.style.display = "none";
     template.style.display = "none";
});
transferBtn.addEventListener("click", () => {
     transferAccount.classList.remove("input-error");
     transferMoney.classList.remove("input-error");
     transferMessage.innerText = "";

     if(!transferAccount.value){
          transferAccount.classList.add("input-error");
          return;
     }

     if(String(transferAccount.value).length != 12){
          transferAccount.classList.add("input-error");
          transferMessage.style.color = "red";
          transferMessage.innerText = "Account Number Must be 12 Digits!";
          return;
     }

     if(!transferMoney.value){
          transferMoney.classList.add("input-error");
          return;
     }
     if(transferMoney.value <= 0 || transferMoney >= 100000){
          transferMessage.style.color = "red";
          transferMoney.classList.add("input-error");
          transferMessage.innerText = "Amount Must be Greater than 0 and less than 100000";
          return;
     }
     if(transferMoney.value > currentUser.balance){
          transferMessage.style.color = "red";
          transferMoney.classList.add("input-error");
          transferMessage.innerText = "Insufficient Balance!";
          return;
     }

     if(currentUser.accountNumber === transferAccount.value){
          transferAccount.classList.add("input-error");
          transferMessage.style.color = "red";
          transferMessage.innerText = "You can't Transfer to Yourself!";
          return;
     }

     let res = Bank.transferMoney(transferAccount.value, transferMoney.value);

     if(res){
          transferMessage.style.color = "green";
          transferMessage.innerText = "Amount Transfered Successfully!";
     } else {
          transferMessage.style.color = "red";
          transferMessage.innerText = "Transaction Failed!\nCheck Account Number!";
     }

     transferAccount.value = "";
     transferMoney.value = "";
});
transferCloseBtn.addEventListener("click", () => {
     transferContainer.style.display = "none";
     template.style.display = "flex";
     transferAccount.value = "";
     transferMoney.value = "";
     transferMessage.innerText = "";
});





function generateAccountNumber(){
     let res = "";
     
     for(let i = 0; i < 12; i++){
          res += Math.floor(Math.random() * 10);
     }

     return res;
}

class Person {
     constructor(name, password){
          if(!name){
               console.log("Enter the Valid Name!");
               return;
          } else if(!password){
               console.log("Enter the Valid Password!");
               return;
          } else {
               this.name = name;
               this.password = password;
          }
     }
}

class Bank extends Person{
     constructor(name, password){
          super(name, password);
          this.balance = 0;
     }


     createAccount(){
          let accounts = JSON.parse(localStorage.getItem("bank_accounts")) || [];
              
          let accNo;

          while(true){
               accNo = generateAccountNumber();
               if(!checkAccount(accNo)){
                    continue;
               }
               this.accountNumber = accNo;   

               break;
          }
          accounts.push({
               name: this.name,
               password: this.password,
               accountNumber: accNo,
               balance: this.balance
          });
          
          currentUser = new Bank(this.name, this.password);
          currentUser.balance = this.balance;
          currentUser.accountNumber = this.accountNumber;
          
          localStorage.setItem("currentUser", JSON.stringify({name: this.name, password: this.password, accountNumber: accNo, balance: this.balance}));
          localStorage.setItem("bank_accounts", JSON.stringify(accounts));
          onLoadUser(currentUser);
          return true;
     }

     static loginToAccount(accNo, password){
          let accounts = JSON.parse(localStorage.getItem("bank_accounts")) || [];

          let user = accounts.find(acc => acc.accountNumber === accNo && acc.password === password);

          if(!user){
               return null;
          }

          currentUser = new Bank(user.name, user.password);
          currentUser.balance = user.balance;
          currentUser.accountNumber = user.accountNumber;

          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          onLoadUser(currentUser);
          return currentUser;
     }

     static deposit(amount){
          if(amount <= 0){
               return false;
          }

          currentUser.balance += amount;
          updateUserAccount(currentUser.accountNumber, currentUser.balance);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          saveHistory(currentUser.accountNumber, amount, new Date().toLocaleString(), "deposit");
          onLoadUser(currentUser);
          return true;
     }

     static withdraw(amount){
          if(amount <= 0){
               return false;
          } else if(amount > currentUser.balance){
               return false;
          } else {
               currentUser.balance -= amount;
               updateUserAccount(currentUser.accountNumber, currentUser.balance);
               localStorage.setItem("currentUser", JSON.stringify(currentUser));
               saveHistory(currentUser.accountNumber, amount, new Date().toLocaleString(), "withdraw");
               onLoadUser(currentUser);
               return true;
          }
     }

     static transferMoney(accNo, money){
          currentUser.balance -= money;

          onLoadUser(currentUser);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          saveHistory(currentUser.accountNumber, money, new Date().toLocaleString(), "transfer");
          
          let accounts = JSON.parse(localStorage.getItem("bank_accounts")) || [];

          if(accounts.length === 0){
               return false;
          }
     
          let user = accounts.filter(ele => ele.accountNumber === accNo);

          if(user.length === 0){
               return false;
          }

          user[0].balance += +money;

     
          localStorage.setItem("bank_accounts", JSON.stringify(accounts));
          updateUserAccount(currentUser.accountNumber, currentUser.balance);
          return true;
     }

     static checkHistory(){
          return JSON.parse(localStorage.getItem("transaction_history")) || [];
     }

     static checkBalance(){
          return currentUser.balance;
     }
}


function saveHistory(accountNumber, amount, date, type){
     let transactionHistory = JSON.parse(localStorage.getItem("transaction_history")) || [];

     transactionHistory.push({
          accountNumber: accountNumber, 
          amount : amount,
          date : getDateInfo(date),
          type : type
     });

     localStorage.setItem("transaction_history", JSON.stringify(transactionHistory));
}

function getDateInfo(date){
     let [datePart, timePart] = date.split(", ");
     let [day, month, year] = datePart.split("/");

     let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

     let monthName = monthNames[+month - 1];

     return `${day} ${monthName} ${year}, ${timePart}`;
}

function checkAccount(accNo){
     let accounts = JSON.parse(localStorage.getItem("bank_accounts")) || [];

     return !accounts.some(acc => acc.accountNumber === accNo);
}

function updateUserAccount(accNo, balance){
     let accounts = JSON.parse(localStorage.getItem("bank_accounts")) || [];

     if(accounts.length === 0){
          return "There is No User to Update!";
     }


     let user = accounts.filter(ele => ele.accountNumber === accNo);
     if(user.length === 0){
          return "User Not Found!";
     }

     user[0].balance = +balance;


     localStorage.setItem("bank_accounts", JSON.stringify(accounts));
     return "Updated Successfully!";
}