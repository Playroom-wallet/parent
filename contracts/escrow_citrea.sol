// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICBTCToken {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract CBTC_Escrow {
    ICBTCToken public cbtcToken;

    struct Escrow {
        address parent;
        address child;
        uint256 balance;
    }

    mapping(address => Escrow) public escrows;

    event Deposited(address indexed parent, address indexed child, uint256 amount);
    event Withdrawn(address indexed child, uint256 amount);

    constructor(address _cbtcTokenAddress) {
        cbtcToken = ICBTCToken(_cbtcTokenAddress);
    }

    function deposit(address child, uint256 amount) external {
        require(child != address(0), "Invalid child address");
        require(amount > 0, "Amount must be greater than 0");

        Escrow storage escrow = escrows[child];

        if (escrow.parent == address(0)) {
            escrow.parent = msg.sender;
            escrow.child = child;
        } else {
            require(escrow.parent == msg.sender, "Only the assigned parent can deposit");
        }

        require(cbtcToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        escrow.balance += amount;

        emit Deposited(msg.sender, child, amount);
    }

    function withdraw(uint256 amount) external {
        Escrow storage escrow = escrows[msg.sender];

        require(escrow.child == msg.sender, "Only the assigned child can withdraw");
        require(escrow.balance >= amount, "Insufficient balance");

        escrow.balance -= amount;

        require(cbtcToken.transfer(msg.sender, amount), "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    function getEscrowBalance(address child) external view returns (uint256) {
        return escrows[child].balance;
    }
}
