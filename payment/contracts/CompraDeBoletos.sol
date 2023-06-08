// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CompraDeBoletos {
    address payable public owner;
    mapping(address => uint256) public purchases;

    event Purchase(address indexed buyer, uint256 amount);

    constructor() {
        owner = payable(0x9c9159245F9d332ea5cbCe6774bE631c36349Fff);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Solo el propietario del contrato puede llamar a esta funcion"
        );
        _;
    }

    function comprar() external payable {
        require(msg.value > 0, "Debe enviar un monto mayor a cero");

        // Guarda la compra realizada por el comprador
        purchases[msg.sender] += msg.value;

        emit Purchase(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No hay fondos disponibles para retirar");

        owner.transfer(balance);
    }
}
