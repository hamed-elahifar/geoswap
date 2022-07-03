Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts
Imports System.Threading
Namespace Farm2.Contracts.GeosSwapTokenV2.ContractDefinition

    
    
    Public Partial Class GeosSwapTokenV2Deployment
     Inherits GeosSwapTokenV2DeploymentBase
    
        Public Sub New()
            MyBase.New(DEFAULT_BYTECODE)
        End Sub
        
        Public Sub New(ByVal byteCode As String)
            MyBase.New(byteCode)
        End Sub
    
    End Class

    Public Class GeosSwapTokenV2DeploymentBase 
            Inherits ContractDeploymentMessage
        
        Public Shared DEFAULT_BYTECODE As String = "610140604052620000136012600a62000613565b62000023906305f5e1006200062b565b600955620000346012600a62000613565b6200004390629896806200062b565b600a55600b805460ff60a01b191690553480156200006057600080fd5b50604051620026f9380380620026f983398101604081905262000083916200064d565b6040518060400160405280600a81526020016923a2a7a9902a37b5b2b760b11b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600a81526020016923a2a7a9902a37b5b2b760b11b8152506040518060400160405280600481526020016347454f5360e01b81525081600390816200011291906200071c565b5060046200012182826200071c565b5050825160209384012082519284019290922060e08390526101008190524660a0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818901819052818301979097526060810194909452608080850193909352308483018190528151808603909301835260c0948501909152815191909601209052929092526101205250506007805460ff19169055620001d46000620001ce6200029a565b620002d7565b620002037f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a620001ce6200029a565b620002327f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6620001ce6200029a565b620002617fcf6f9f892731e14b8859835f2ff35575f447fb501f46243c4eb8bac19e31a050620001ce6200029a565b600b80546001600160a01b0319166001600160a01b038316179055620002936200028a6200029a565b600a54620002e7565b5062000803565b600b546000906001600160a01b03163303620002bd575060131936013560601c90565b620002d2620003de60201b62000d7d1760201c565b905090565b620002e38282620003e2565b5050565b6001600160a01b038216620003435760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064015b60405180910390fd5b62000351600083836200046e565b8060026000828254620003659190620007e8565b90915550506001600160a01b0382166000908152602081905260408120805483929062000394908490620007e8565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b3390565b620003ee8282620004d3565b620002e35760008281526008602090815260408083206001600160a01b03851684529091529020805460ff191660011790556200042a6200029a565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60075460ff1615620004b65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016200033a565b620004ce838383620004ce60201b6200071e1760201c565b505050565b60008281526008602090815260408083206001600160a01b038516845290915290205460ff165b92915050565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620005575781600019048211156200053b576200053b62000500565b808516156200054957918102915b93841c93908002906200051b565b509250929050565b6000826200057057506001620004fa565b816200057f57506000620004fa565b8160018114620005985760028114620005a357620005c3565b6001915050620004fa565b60ff841115620005b757620005b762000500565b50506001821b620004fa565b5060208310610133831016604e8410600b8410161715620005e8575081810a620004fa565b620005f4838362000516565b80600019048211156200060b576200060b62000500565b029392505050565b60006200062460ff8416836200055f565b9392505050565b600081600019048311821515161562000648576200064862000500565b500290565b6000602082840312156200066057600080fd5b81516001600160a01b03811681146200062457600080fd5b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620006a357607f821691505b602082108103620006c457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620004ce57600081815260208120601f850160051c81016020861015620006f35750805b601f850160051c820191505b818110156200071457828155600101620006ff565b505050505050565b81516001600160401b0381111562000738576200073862000678565b62000750816200074984546200068e565b84620006ca565b602080601f8311600181146200078857600084156200076f5750858301515b600019600386901b1c1916600185901b17855562000714565b600085815260208120601f198616915b82811015620007b95788860151825594840194600190910190840162000798565b5085821015620007d85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008219821115620007fe57620007fe62000500565b500190565b60805160a05160c05160e0516101005161012051611ea66200085360003960006112390152600061128801526000611263015260006111bc015260006111e6015260006112100152611ea66000f3fe608060405234801561001057600080fd5b506004361061021c5760003560e01c80635c975abb11610125578063a457c2d7116100ad578063d53913931161007c578063d53913931461049f578063d547741f146104c6578063d5abeb01146104d9578063dd62ed3e146104e1578063e63ab1e9146104f457600080fd5b8063a457c2d714610452578063a8c95dc014610465578063a9059cbb14610479578063d505accf1461048c57600080fd5b806381566eaa116100f457806381566eaa146104005780638456cb591461042757806391d148541461042f57806395d89b4114610442578063a217fddf1461044a57600080fd5b80635c975abb1461039257806370a082311461039d57806371372544146103c65780637ecebe00146103ed57600080fd5b8063313ce567116101a85780633f4ba83a116101775780633f4ba83a1461033a57806340c10f1914610342578063572b6c05146103555780635737619814610377578063578bb42d1461038a57600080fd5b8063313ce567146102fd5780633644e5151461030c57806336568abe14610314578063395093511461032757600080fd5b806318160ddd116101ef57806318160ddd1461027b57806323b872dd1461028d578063248a9ca3146102a05780632f2ff15d146102c357806330d643b5146102d657600080fd5b806301ffc9a71461022157806306fdde0314610249578063083836401461025e578063095ea7b314610268575b600080fd5b61023461022f366004611ae9565b61051b565b60405190151581526020015b60405180910390f35b610251610552565b6040516102409190611b3f565b6102666105e4565b005b610234610276366004611b87565b6106a9565b6002545b604051908152602001610240565b61023461029b366004611bb3565b6106cb565b61027f6102ae366004611bf4565b60009081526008602052604090206001015490565b6102666102d1366004611c0d565b6106f9565b61027f7f7a05a596cb0ce7fdea8a1e1ec73be300bdb35097c944ce1897202f7a13122eb281565b60405160128152602001610240565b61027f610723565b610266610322366004611c0d565b610732565b610234610335366004611b87565b6107c0565b6102666107ec565b610266610350366004611b87565b610821565b610234610363366004611c3d565b600b546001600160a01b0391821691161490565b610266610385366004611b87565b6108cf565b6102666109db565b60075460ff16610234565b61027f6103ab366004611c3d565b6001600160a01b031660009081526020819052604090205490565b61027f7fcf6f9f892731e14b8859835f2ff35575f447fb501f46243c4eb8bac19e31a05081565b61027f6103fb366004611c3d565b610aa1565b61027f7ffca79f3adba7490137e2d16caa9b169b63452adad6a6798627350f3fe4a4aaf081565b610266610abf565b61023461043d366004611c0d565b610af1565b610251610b1c565b61027f600081565b610234610460366004611b87565b610b2b565b600b5461023490600160a01b900460ff1681565b610234610487366004611b87565b610bb1565b61026661049a366004611c5a565b610bc9565b61027f7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102666104d4366004611c0d565b610d2d565b60095461027f565b61027f6104ef366004611cd1565b610d52565b61027f7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60006001600160e01b03198216637965db0b60e01b148061054c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606003805461056190611cff565b80601f016020809104026020016040519081016040528092919081815260200182805461058d90611cff565b80156105da5780601f106105af576101008083540402835291602001916105da565b820191906000526020600020905b8154815290600101906020018083116105bd57829003601f168201915b5050505050905090565b60006105ef81610d81565b600b54600160a01b900460ff1661065c5760405162461bcd60e51b815260206004820152602660248201527f4d657461207472616e73616374696f6e732061726520616c72656164792064696044820152651cd8589b195960d21b60648201526084015b60405180910390fd5b600b805460ff60a01b19169055610671610d92565b6001600160a01b03167f096be170ccc67847e55535e7d8334b2afedd95805baedc160005addb9144745060405160405180910390a250565b6000806106b4610d92565b90506106c1818585610db9565b5060019392505050565b6000806106d6610d92565b90506106e3858285610ed5565b6106ee858585610f4f565b506001949350505050565b60008281526008602052604090206001015461071481610d81565b61071e8383611128565b505050565b600061072d6111af565b905090565b61073a610d92565b6001600160a01b0316816001600160a01b0316146107b25760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610653565b6107bc82826112d6565b5050565b6000806107cb610d92565b90506106c18185856107dd8589610d52565b6107e79190611d49565b610db9565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61081681610d81565b61081e61135b565b50565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661084b81610d81565b6009548261085860025490565b6108629190611d49565b11156108c55760405162461bcd60e51b815260206004820152602c60248201527f45524332303a2063616e6e6f74206d696e74206d6f726520746f6b656e732c2060448201526b18d85c08195e18d95959195960a21b6064820152608401610653565b61071e83836113f4565b7fcf6f9f892731e14b8859835f2ff35575f447fb501f46243c4eb8bac19e31a0506108f981610d81565b826001600160a01b031663a9059cbb610910610d92565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018590526044016020604051808303816000875af115801561095d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109819190611d61565b50826001600160a01b0316610994610d92565b6001600160a01b03167f77023e19c7343ad491fd706c36335ca0e738340a91f29b1fd81e2673d44896c4846040516109ce91815260200190565b60405180910390a3505050565b60006109e681610d81565b600b54600160a01b900460ff1615610a4e5760405162461bcd60e51b815260206004820152602560248201527f4d657461207472616e73616374696f6e732061726520616c726561647920656e60448201526418589b195960da1b6064820152608401610653565b600b805460ff60a01b1916600160a01b179055610a69610d92565b6001600160a01b03167f92e4c08d47b71e8dc051232b8e475ec296489a67a4ba5cca88ff20fb6ac499e660405160405180910390a250565b6001600160a01b03811660009081526005602052604081205461054c565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610ae981610d81565b61081e6114df565b60009182526008602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606004805461056190611cff565b600080610b36610d92565b90506000610b448286610d52565b905083811015610ba45760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610653565b6106ee8286868403610db9565b600080610bbc610d92565b90506106c1818585610f4f565b83421115610c195760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152606401610653565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9888888610c488c61155b565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610ca382611583565b90506000610cb3828787876115d1565b9050896001600160a01b0316816001600160a01b031614610d165760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152606401610653565b610d218a8a8a610db9565b50505050505050505050565b600082815260086020526040902060010154610d4881610d81565b61071e83836112d6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b61081e81610d8d610d92565b6115f9565b600b546000906001600160a01b03163303610db4575060131936013560601c90565b503390565b6001600160a01b038316610e1b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610653565b6001600160a01b038216610e7c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610653565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591016109ce565b6000610ee18484610d52565b90506000198114610f495781811015610f3c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610653565b610f498484848403610db9565b50505050565b6001600160a01b038316610fb35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610653565b6001600160a01b0382166110155760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610653565b61102083838361165d565b6001600160a01b038316600090815260208190526040902054818110156110985760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610653565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906110cf908490611d49565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161111b91815260200190565b60405180910390a3610f49565b6111328282610af1565b6107bc5760008281526008602090815260408083206001600160a01b03851684529091529020805460ff1916600117905561116b610d92565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561120857507f000000000000000000000000000000000000000000000000000000000000000046145b1561123257507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6112e08282610af1565b156107bc5760008281526008602090815260408083206001600160a01b03851684529091529020805460ff19169055611317610d92565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60075460ff166113a45760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610653565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6113d7610d92565b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b03821661144a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610653565b6114566000838361165d565b80600260008282546114689190611d49565b90915550506001600160a01b03821660009081526020819052604081208054839290611495908490611d49565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60075460ff16156115255760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610653565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586113d7610d92565b6001600160a01b03811660009081526005602052604090208054600181018255905b50919050565b600061054c6115906111af565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006115e2878787876116a3565b915091506115ef81611790565b5095945050505050565b6116038282610af1565b6107bc5761161b816001600160a01b03166014611946565b611626836020611946565b604051602001611637929190611d83565b60408051601f198184030181529082905262461bcd60e51b825261065391600401611b3f565b60075460ff161561071e5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610653565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156116da5750600090506003611787565b8460ff16601b141580156116f257508460ff16601c14155b156117035750600090506004611787565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611757573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661178057600060019250925050611787565b9150600090505b94509492505050565b60008160048111156117a4576117a4611df8565b036117ac5750565b60018160048111156117c0576117c0611df8565b0361180d5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610653565b600281600481111561182157611821611df8565b0361186e5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610653565b600381600481111561188257611882611df8565b036118da5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610653565b60048160048111156118ee576118ee611df8565b0361081e5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610653565b60606000611955836002611e0e565b611960906002611d49565b67ffffffffffffffff81111561197857611978611e2d565b6040519080825280601f01601f1916602001820160405280156119a2576020820181803683370190505b509050600360fc1b816000815181106119bd576119bd611e43565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106119ec576119ec611e43565b60200101906001600160f81b031916908160001a9053506000611a10846002611e0e565b611a1b906001611d49565b90505b6001811115611a93576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611a4f57611a4f611e43565b1a60f81b828281518110611a6557611a65611e43565b60200101906001600160f81b031916908160001a90535060049490941c93611a8c81611e59565b9050611a1e565b508315611ae25760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610653565b9392505050565b600060208284031215611afb57600080fd5b81356001600160e01b031981168114611ae257600080fd5b60005b83811015611b2e578181015183820152602001611b16565b83811115610f495750506000910152565b6020815260008251806020840152611b5e816040850160208701611b13565b601f01601f19169190910160400192915050565b6001600160a01b038116811461081e57600080fd5b60008060408385031215611b9a57600080fd5b8235611ba581611b72565b946020939093013593505050565b600080600060608486031215611bc857600080fd5b8335611bd381611b72565b92506020840135611be381611b72565b929592945050506040919091013590565b600060208284031215611c0657600080fd5b5035919050565b60008060408385031215611c2057600080fd5b823591506020830135611c3281611b72565b809150509250929050565b600060208284031215611c4f57600080fd5b8135611ae281611b72565b600080600080600080600060e0888a031215611c7557600080fd5b8735611c8081611b72565b96506020880135611c9081611b72565b95506040880135945060608801359350608088013560ff81168114611cb457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611ce457600080fd5b8235611cef81611b72565b91506020830135611c3281611b72565b600181811c90821680611d1357607f821691505b60208210810361157d57634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115611d5c57611d5c611d33565b500190565b600060208284031215611d7357600080fd5b81518015158114611ae257600080fd5b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611dbb816017850160208801611b13565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611dec816028840160208801611b13565b01602801949350505050565b634e487b7160e01b600052602160045260246000fd5b6000816000190483118215151615611e2857611e28611d33565b500290565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081611e6857611e68611d33565b50600019019056fea2646970667358221220b7edea17a958a4fd7325047f6f9c33b4742c062889d06556641631f5ec2e443164736f6c634300080f0033"
        
        Public Sub New()
            MyBase.New(DEFAULT_BYTECODE)
        End Sub
        
        Public Sub New(ByVal byteCode As String)
            MyBase.New(byteCode)
        End Sub
        
        <[Parameter]("address", "trustedForwarder", 1)>
        Public Overridable Property [TrustedForwarder] As String
    
    End Class    
    
    Public Partial Class DefaultAdminRoleFunction
        Inherits DefaultAdminRoleFunctionBase
    End Class

        <[Function]("DEFAULT_ADMIN_ROLE", "bytes32")>
    Public Class DefaultAdminRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class DomainSeparatorFunction
        Inherits DomainSeparatorFunctionBase
    End Class

        <[Function]("DOMAIN_SEPARATOR", "bytes32")>
    Public Class DomainSeparatorFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class MinterRoleFunction
        Inherits MinterRoleFunctionBase
    End Class

        <[Function]("MINTER_ROLE", "bytes32")>
    Public Class MinterRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class PauserRoleFunction
        Inherits PauserRoleFunctionBase
    End Class

        <[Function]("PAUSER_ROLE", "bytes32")>
    Public Class PauserRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class RescuerRoleFunction
        Inherits RescuerRoleFunctionBase
    End Class

        <[Function]("RESCUER_ROLE", "bytes32")>
    Public Class RescuerRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class RouterRoleFunction
        Inherits RouterRoleFunctionBase
    End Class

        <[Function]("ROUTER_ROLE", "bytes32")>
    Public Class RouterRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class TakeFeeRoleFunction
        Inherits TakeFeeRoleFunctionBase
    End Class

        <[Function]("TAKE_FEE_ROLE", "bytes32")>
    Public Class TakeFeeRoleFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class AllowanceFunction
        Inherits AllowanceFunctionBase
    End Class

        <[Function]("allowance", "uint256")>
    Public Class AllowanceFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "owner", 1)>
        Public Overridable Property [Owner] As String
        <[Parameter]("address", "spender", 2)>
        Public Overridable Property [Spender] As String
    
    End Class
    
    
    Public Partial Class ApproveFunction
        Inherits ApproveFunctionBase
    End Class

        <[Function]("approve", "bool")>
    Public Class ApproveFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "spender", 1)>
        Public Overridable Property [Spender] As String
        <[Parameter]("uint256", "amount", 2)>
        Public Overridable Property [Amount] As BigInteger
    
    End Class
    
    
    Public Partial Class BalanceOfFunction
        Inherits BalanceOfFunctionBase
    End Class

        <[Function]("balanceOf", "uint256")>
    Public Class BalanceOfFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "account", 1)>
        Public Overridable Property [Account] As String
    
    End Class
    
    
    Public Partial Class DecimalsFunction
        Inherits DecimalsFunctionBase
    End Class

        <[Function]("decimals", "uint8")>
    Public Class DecimalsFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class DecreaseAllowanceFunction
        Inherits DecreaseAllowanceFunctionBase
    End Class

        <[Function]("decreaseAllowance", "bool")>
    Public Class DecreaseAllowanceFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "spender", 1)>
        Public Overridable Property [Spender] As String
        <[Parameter]("uint256", "subtractedValue", 2)>
        Public Overridable Property [SubtractedValue] As BigInteger
    
    End Class
    
    
    Public Partial Class DisableMetaTxnsFunction
        Inherits DisableMetaTxnsFunctionBase
    End Class

        <[Function]("disableMetaTxns")>
    Public Class DisableMetaTxnsFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class EnableMetaTxnsFunction
        Inherits EnableMetaTxnsFunctionBase
    End Class

        <[Function]("enableMetaTxns")>
    Public Class EnableMetaTxnsFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class GetRoleAdminFunction
        Inherits GetRoleAdminFunctionBase
    End Class

        <[Function]("getRoleAdmin", "bytes32")>
    Public Class GetRoleAdminFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes32", "role", 1)>
        Public Overridable Property [Role] As Byte()
    
    End Class
    
    
    Public Partial Class GrantRoleFunction
        Inherits GrantRoleFunctionBase
    End Class

        <[Function]("grantRole")>
    Public Class GrantRoleFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes32", "role", 1)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2)>
        Public Overridable Property [Account] As String
    
    End Class
    
    
    Public Partial Class HasRoleFunction
        Inherits HasRoleFunctionBase
    End Class

        <[Function]("hasRole", "bool")>
    Public Class HasRoleFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes32", "role", 1)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2)>
        Public Overridable Property [Account] As String
    
    End Class
    
    
    Public Partial Class IncreaseAllowanceFunction
        Inherits IncreaseAllowanceFunctionBase
    End Class

        <[Function]("increaseAllowance", "bool")>
    Public Class IncreaseAllowanceFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "spender", 1)>
        Public Overridable Property [Spender] As String
        <[Parameter]("uint256", "addedValue", 2)>
        Public Overridable Property [AddedValue] As BigInteger
    
    End Class
    
    
    Public Partial Class IsTrustedForwarderFunction
        Inherits IsTrustedForwarderFunctionBase
    End Class

        <[Function]("isTrustedForwarder", "bool")>
    Public Class IsTrustedForwarderFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "forwarder", 1)>
        Public Overridable Property [Forwarder] As String
    
    End Class
    
    
    Public Partial Class MaxSupplyFunction
        Inherits MaxSupplyFunctionBase
    End Class

        <[Function]("maxSupply", "uint256")>
    Public Class MaxSupplyFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class MetaTxnsEnabledFunction
        Inherits MetaTxnsEnabledFunctionBase
    End Class

        <[Function]("metaTxnsEnabled", "bool")>
    Public Class MetaTxnsEnabledFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class MintFunction
        Inherits MintFunctionBase
    End Class

        <[Function]("mint")>
    Public Class MintFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "to", 1)>
        Public Overridable Property [To] As String
        <[Parameter]("uint256", "amount", 2)>
        Public Overridable Property [Amount] As BigInteger
    
    End Class
    
    
    Public Partial Class NameFunction
        Inherits NameFunctionBase
    End Class

        <[Function]("name", "string")>
    Public Class NameFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class NoncesFunction
        Inherits NoncesFunctionBase
    End Class

        <[Function]("nonces", "uint256")>
    Public Class NoncesFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "owner", 1)>
        Public Overridable Property [Owner] As String
    
    End Class
    
    
    Public Partial Class PauseFunction
        Inherits PauseFunctionBase
    End Class

        <[Function]("pause")>
    Public Class PauseFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class PausedFunction
        Inherits PausedFunctionBase
    End Class

        <[Function]("paused", "bool")>
    Public Class PausedFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class PermitFunction
        Inherits PermitFunctionBase
    End Class

        <[Function]("permit")>
    Public Class PermitFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "owner", 1)>
        Public Overridable Property [Owner] As String
        <[Parameter]("address", "spender", 2)>
        Public Overridable Property [Spender] As String
        <[Parameter]("uint256", "value", 3)>
        Public Overridable Property [Value] As BigInteger
        <[Parameter]("uint256", "deadline", 4)>
        Public Overridable Property [Deadline] As BigInteger
        <[Parameter]("uint8", "v", 5)>
        Public Overridable Property [V] As Byte
        <[Parameter]("bytes32", "r", 6)>
        Public Overridable Property [R] As Byte()
        <[Parameter]("bytes32", "s", 7)>
        Public Overridable Property [S] As Byte()
    
    End Class
    
    
    Public Partial Class RenounceRoleFunction
        Inherits RenounceRoleFunctionBase
    End Class

        <[Function]("renounceRole")>
    Public Class RenounceRoleFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes32", "role", 1)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2)>
        Public Overridable Property [Account] As String
    
    End Class
    
    
    Public Partial Class RescueTokensFunction
        Inherits RescueTokensFunctionBase
    End Class

        <[Function]("rescueTokens")>
    Public Class RescueTokensFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "token", 1)>
        Public Overridable Property [Token] As String
        <[Parameter]("uint256", "value", 2)>
        Public Overridable Property [Value] As BigInteger
    
    End Class
    
    
    Public Partial Class RevokeRoleFunction
        Inherits RevokeRoleFunctionBase
    End Class

        <[Function]("revokeRole")>
    Public Class RevokeRoleFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes32", "role", 1)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2)>
        Public Overridable Property [Account] As String
    
    End Class
    
    
    Public Partial Class SupportsInterfaceFunction
        Inherits SupportsInterfaceFunctionBase
    End Class

        <[Function]("supportsInterface", "bool")>
    Public Class SupportsInterfaceFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("bytes4", "interfaceId", 1)>
        Public Overridable Property [InterfaceId] As Byte()
    
    End Class
    
    
    Public Partial Class SymbolFunction
        Inherits SymbolFunctionBase
    End Class

        <[Function]("symbol", "string")>
    Public Class SymbolFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class TotalSupplyFunction
        Inherits TotalSupplyFunctionBase
    End Class

        <[Function]("totalSupply", "uint256")>
    Public Class TotalSupplyFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class TransferFunction
        Inherits TransferFunctionBase
    End Class

        <[Function]("transfer", "bool")>
    Public Class TransferFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "to", 1)>
        Public Overridable Property [To] As String
        <[Parameter]("uint256", "amount", 2)>
        Public Overridable Property [Amount] As BigInteger
    
    End Class
    
    
    Public Partial Class TransferFromFunction
        Inherits TransferFromFunctionBase
    End Class

        <[Function]("transferFrom", "bool")>
    Public Class TransferFromFunctionBase
        Inherits FunctionMessage
    
        <[Parameter]("address", "from", 1)>
        Public Overridable Property [From] As String
        <[Parameter]("address", "to", 2)>
        Public Overridable Property [To] As String
        <[Parameter]("uint256", "amount", 3)>
        Public Overridable Property [Amount] As BigInteger
    
    End Class
    
    
    Public Partial Class UnpauseFunction
        Inherits UnpauseFunctionBase
    End Class

        <[Function]("unpause")>
    Public Class UnpauseFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class ApprovalEventDTO
        Inherits ApprovalEventDTOBase
    End Class

    <[Event]("Approval")>
    Public Class ApprovalEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "owner", 1, true)>
        Public Overridable Property [Owner] As String
        <[Parameter]("address", "spender", 2, true)>
        Public Overridable Property [Spender] As String
        <[Parameter]("uint256", "value", 3, false)>
        Public Overridable Property [Value] As BigInteger
    
    End Class    
    
    Public Partial Class MetaTxnsDisabledEventDTO
        Inherits MetaTxnsDisabledEventDTOBase
    End Class

    <[Event]("MetaTxnsDisabled")>
    Public Class MetaTxnsDisabledEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "caller", 1, true)>
        Public Overridable Property [Caller] As String
    
    End Class    
    
    Public Partial Class MetaTxnsEnabledEventDTO
        Inherits MetaTxnsEnabledEventDTOBase
    End Class

    <[Event]("MetaTxnsEnabled")>
    Public Class MetaTxnsEnabledEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "caller", 1, true)>
        Public Overridable Property [Caller] As String
    
    End Class    
    
    Public Partial Class PausedEventDTO
        Inherits PausedEventDTOBase
    End Class

    <[Event]("Paused")>
    Public Class PausedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "account", 1, false)>
        Public Overridable Property [Account] As String
    
    End Class    
    
    Public Partial Class RoleAdminChangedEventDTO
        Inherits RoleAdminChangedEventDTOBase
    End Class

    <[Event]("RoleAdminChanged")>
    Public Class RoleAdminChangedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("bytes32", "role", 1, true)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("bytes32", "previousAdminRole", 2, true)>
        Public Overridable Property [PreviousAdminRole] As Byte()
        <[Parameter]("bytes32", "newAdminRole", 3, true)>
        Public Overridable Property [NewAdminRole] As Byte()
    
    End Class    
    
    Public Partial Class RoleGrantedEventDTO
        Inherits RoleGrantedEventDTOBase
    End Class

    <[Event]("RoleGranted")>
    Public Class RoleGrantedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("bytes32", "role", 1, true)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2, true)>
        Public Overridable Property [Account] As String
        <[Parameter]("address", "sender", 3, true)>
        Public Overridable Property [Sender] As String
    
    End Class    
    
    Public Partial Class RoleRevokedEventDTO
        Inherits RoleRevokedEventDTOBase
    End Class

    <[Event]("RoleRevoked")>
    Public Class RoleRevokedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("bytes32", "role", 1, true)>
        Public Overridable Property [Role] As Byte()
        <[Parameter]("address", "account", 2, true)>
        Public Overridable Property [Account] As String
        <[Parameter]("address", "sender", 3, true)>
        Public Overridable Property [Sender] As String
    
    End Class    
    
    Public Partial Class TokensRescuedEventDTO
        Inherits TokensRescuedEventDTOBase
    End Class

    <[Event]("TokensRescued")>
    Public Class TokensRescuedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "sender", 1, true)>
        Public Overridable Property [Sender] As String
        <[Parameter]("address", "token", 2, true)>
        Public Overridable Property [Token] As String
        <[Parameter]("uint256", "value", 3, false)>
        Public Overridable Property [Value] As BigInteger
    
    End Class    
    
    Public Partial Class TransferEventDTO
        Inherits TransferEventDTOBase
    End Class

    <[Event]("Transfer")>
    Public Class TransferEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "from", 1, true)>
        Public Overridable Property [From] As String
        <[Parameter]("address", "to", 2, true)>
        Public Overridable Property [To] As String
        <[Parameter]("uint256", "value", 3, false)>
        Public Overridable Property [Value] As BigInteger
    
    End Class    
    
    Public Partial Class UnpausedEventDTO
        Inherits UnpausedEventDTOBase
    End Class

    <[Event]("Unpaused")>
    Public Class UnpausedEventDTOBase
        Implements IEventDTO
        
        <[Parameter]("address", "account", 1, false)>
        Public Overridable Property [Account] As String
    
    End Class    
    
    Public Partial Class DefaultAdminRoleOutputDTO
        Inherits DefaultAdminRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class DefaultAdminRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class DomainSeparatorOutputDTO
        Inherits DomainSeparatorOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class DomainSeparatorOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class MinterRoleOutputDTO
        Inherits MinterRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class MinterRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class PauserRoleOutputDTO
        Inherits PauserRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class PauserRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class RescuerRoleOutputDTO
        Inherits RescuerRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class RescuerRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class RouterRoleOutputDTO
        Inherits RouterRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class RouterRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class TakeFeeRoleOutputDTO
        Inherits TakeFeeRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class TakeFeeRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    Public Partial Class AllowanceOutputDTO
        Inherits AllowanceOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class AllowanceOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint256", "", 1)>
        Public Overridable Property [ReturnValue1] As BigInteger
    
    End Class    
    
    
    
    Public Partial Class BalanceOfOutputDTO
        Inherits BalanceOfOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class BalanceOfOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint256", "", 1)>
        Public Overridable Property [ReturnValue1] As BigInteger
    
    End Class    
    
    Public Partial Class DecimalsOutputDTO
        Inherits DecimalsOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class DecimalsOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint8", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte
    
    End Class    
    
    
    
    
    
    
    
    Public Partial Class GetRoleAdminOutputDTO
        Inherits GetRoleAdminOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class GetRoleAdminOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bytes32", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte()
    
    End Class    
    
    
    
    Public Partial Class HasRoleOutputDTO
        Inherits HasRoleOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class HasRoleOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bool", "", 1)>
        Public Overridable Property [ReturnValue1] As Boolean
    
    End Class    
    
    
    
    Public Partial Class IsTrustedForwarderOutputDTO
        Inherits IsTrustedForwarderOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class IsTrustedForwarderOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bool", "", 1)>
        Public Overridable Property [ReturnValue1] As Boolean
    
    End Class    
    
    Public Partial Class MaxSupplyOutputDTO
        Inherits MaxSupplyOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class MaxSupplyOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint256", "", 1)>
        Public Overridable Property [ReturnValue1] As BigInteger
    
    End Class    
    
    Public Partial Class MetaTxnsEnabledOutputDTO
        Inherits MetaTxnsEnabledOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class MetaTxnsEnabledOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bool", "", 1)>
        Public Overridable Property [ReturnValue1] As Boolean
    
    End Class    
    
    
    
    Public Partial Class NameOutputDTO
        Inherits NameOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class NameOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("string", "", 1)>
        Public Overridable Property [ReturnValue1] As String
    
    End Class    
    
    Public Partial Class NoncesOutputDTO
        Inherits NoncesOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class NoncesOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint256", "", 1)>
        Public Overridable Property [ReturnValue1] As BigInteger
    
    End Class    
    
    
    
    Public Partial Class PausedOutputDTO
        Inherits PausedOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class PausedOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bool", "", 1)>
        Public Overridable Property [ReturnValue1] As Boolean
    
    End Class    
    
    
    
    
    
    
    
    
    
    Public Partial Class SupportsInterfaceOutputDTO
        Inherits SupportsInterfaceOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class SupportsInterfaceOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("bool", "", 1)>
        Public Overridable Property [ReturnValue1] As Boolean
    
    End Class    
    
    Public Partial Class SymbolOutputDTO
        Inherits SymbolOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class SymbolOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("string", "", 1)>
        Public Overridable Property [ReturnValue1] As String
    
    End Class    
    
    Public Partial Class TotalSupplyOutputDTO
        Inherits TotalSupplyOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class TotalSupplyOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint256", "", 1)>
        Public Overridable Property [ReturnValue1] As BigInteger
    
    End Class    
    
    
    
    
    

End Namespace
