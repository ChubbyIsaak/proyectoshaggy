
import Web3 from 'web3';
// Establece la conexión con Ganache
const web3 = new Web3('http://localhost:7545');
// Dirección del contrato y ABI
const contractAddress = "0xA3AaD0c2b2D6f62626A71B3E17fF9D0538a36eCF";
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Purchase",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "comprar",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "purchases",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    // ABI del contrato
];
export default contractABI;

// Instancia del contrato

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Manejo del envío del formulario
document.getElementById("paymentForm")!.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardNumber = (<HTMLInputElement>document.getElementById("cardNumber"))!.value;
    const name = (<HTMLInputElement>document.getElementById("name"))!.value;
    const expiration = (<HTMLInputElement>document.getElementById("expiration"))!.value;
    const cvv = (<HTMLInputElement>document.getElementById("cvv"))!.value;
    // Realiza la llamada a la función "comprar" del contrato
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.comprar().send({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether") // Aquí puedes ajustar el monto a enviar
        });

        console.log(result);
        alert("Compra realizada exitosamente");
    } catch (error) {
        console.error(error);
        alert("Error al realizar la compra");
    }

});

