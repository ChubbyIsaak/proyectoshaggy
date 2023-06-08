// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TransferenciaEthereum {
    address payable public owner;
    mapping(address => uint256) public purchases;

    event Purchase(address indexed buyer, uint256 amount);

    constructor() {
        owner = payable(0x540BC919f17d92303b15c076f4699119a79c811f);
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
