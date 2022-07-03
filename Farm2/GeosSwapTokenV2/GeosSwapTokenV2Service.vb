Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts.ContractHandlers
Imports Nethereum.Contracts
Imports System.Threading
Imports Farm2.Contracts.GeosSwapTokenV2.ContractDefinition
Namespace Farm2.Contracts.GeosSwapTokenV2


    Public Partial Class GeosSwapTokenV2Service
    
    
        Public Shared Function DeployContractAndWaitForReceiptAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal geosSwapTokenV2Deployment As GeosSwapTokenV2Deployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return web3.Eth.GetContractDeploymentHandler(Of GeosSwapTokenV2Deployment)().SendRequestAndWaitForReceiptAsync(geosSwapTokenV2Deployment, cancellationTokenSource)
        
        End Function
         Public Shared Function DeployContractAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal geosSwapTokenV2Deployment As GeosSwapTokenV2Deployment) As Task(Of String)
        
            Return web3.Eth.GetContractDeploymentHandler(Of GeosSwapTokenV2Deployment)().SendRequestAsync(geosSwapTokenV2Deployment)
        
        End Function
        Public Shared Async Function DeployContractAndGetServiceAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal geosSwapTokenV2Deployment As GeosSwapTokenV2Deployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of GeosSwapTokenV2Service)
        
            Dim receipt = Await DeployContractAndWaitForReceiptAsync(web3, geosSwapTokenV2Deployment, cancellationTokenSource)
            Return New GeosSwapTokenV2Service(web3, receipt.ContractAddress)
        
        End Function
    
        Protected Property Web3 As Nethereum.Web3.Web3
        
        Public Property ContractHandler As ContractHandler
        
        Public Sub New(ByVal web3 As Nethereum.Web3.Web3, ByVal contractAddress As String)
            Web3 = web3
            ContractHandler = web3.Eth.GetContractHandler(contractAddress)
        End Sub
    
        Public Function DefaultAdminRoleQueryAsync(ByVal defaultAdminRoleFunction As DefaultAdminRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of DefaultAdminRoleFunction, Byte())(defaultAdminRoleFunction, blockParameter)
        
        End Function

        
        Public Function DefaultAdminRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of DefaultAdminRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function DomainSeparatorQueryAsync(ByVal domainSeparatorFunction As DomainSeparatorFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of DomainSeparatorFunction, Byte())(domainSeparatorFunction, blockParameter)
        
        End Function

        
        Public Function DomainSeparatorQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of DomainSeparatorFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function MinterRoleQueryAsync(ByVal minterRoleFunction As MinterRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of MinterRoleFunction, Byte())(minterRoleFunction, blockParameter)
        
        End Function

        
        Public Function MinterRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of MinterRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function PauserRoleQueryAsync(ByVal pauserRoleFunction As PauserRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of PauserRoleFunction, Byte())(pauserRoleFunction, blockParameter)
        
        End Function

        
        Public Function PauserRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of PauserRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function RescuerRoleQueryAsync(ByVal rescuerRoleFunction As RescuerRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of RescuerRoleFunction, Byte())(rescuerRoleFunction, blockParameter)
        
        End Function

        
        Public Function RescuerRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of RescuerRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function RouterRoleQueryAsync(ByVal routerRoleFunction As RouterRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of RouterRoleFunction, Byte())(routerRoleFunction, blockParameter)
        
        End Function

        
        Public Function RouterRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of RouterRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function TakeFeeRoleQueryAsync(ByVal takeFeeRoleFunction As TakeFeeRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of TakeFeeRoleFunction, Byte())(takeFeeRoleFunction, blockParameter)
        
        End Function

        
        Public Function TakeFeeRoleQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            return ContractHandler.QueryAsync(Of TakeFeeRoleFunction, Byte())(Nothing, blockParameter)
        
        End Function



        Public Function AllowanceQueryAsync(ByVal allowanceFunction As AllowanceFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of AllowanceFunction, BigInteger)(allowanceFunction, blockParameter)
        
        End Function

        
        Public Function AllowanceQueryAsync(ByVal [owner] As String, ByVal [spender] As String, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Dim allowanceFunction = New AllowanceFunction()
                allowanceFunction.Owner = [owner]
                allowanceFunction.Spender = [spender]
            
            Return ContractHandler.QueryAsync(Of AllowanceFunction, BigInteger)(allowanceFunction, blockParameter)
        
        End Function


        Public Function ApproveRequestAsync(ByVal approveFunction As ApproveFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of ApproveFunction)(approveFunction)
        
        End Function

        Public Function ApproveRequestAndWaitForReceiptAsync(ByVal approveFunction As ApproveFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of ApproveFunction)(approveFunction, cancellationToken)
        
        End Function

        
        Public Function ApproveRequestAsync(ByVal [spender] As String, ByVal [amount] As BigInteger) As Task(Of String)
        
            Dim approveFunction = New ApproveFunction()
                approveFunction.Spender = [spender]
                approveFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAsync(Of ApproveFunction)(approveFunction)
        
        End Function

        
        Public Function ApproveRequestAndWaitForReceiptAsync(ByVal [spender] As String, ByVal [amount] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim approveFunction = New ApproveFunction()
                approveFunction.Spender = [spender]
                approveFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of ApproveFunction)(approveFunction, cancellationToken)
        
        End Function
        Public Function BalanceOfQueryAsync(ByVal balanceOfFunction As BalanceOfFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of BalanceOfFunction, BigInteger)(balanceOfFunction, blockParameter)
        
        End Function

        
        Public Function BalanceOfQueryAsync(ByVal [account] As String, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Dim balanceOfFunction = New BalanceOfFunction()
                balanceOfFunction.Account = [account]
            
            Return ContractHandler.QueryAsync(Of BalanceOfFunction, BigInteger)(balanceOfFunction, blockParameter)
        
        End Function


        Public Function DecimalsQueryAsync(ByVal decimalsFunction As DecimalsFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte)
        
            Return ContractHandler.QueryAsync(Of DecimalsFunction, Byte)(decimalsFunction, blockParameter)
        
        End Function

        
        Public Function DecimalsQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte)
        
            return ContractHandler.QueryAsync(Of DecimalsFunction, Byte)(Nothing, blockParameter)
        
        End Function



        Public Function DecreaseAllowanceRequestAsync(ByVal decreaseAllowanceFunction As DecreaseAllowanceFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of DecreaseAllowanceFunction)(decreaseAllowanceFunction)
        
        End Function

        Public Function DecreaseAllowanceRequestAndWaitForReceiptAsync(ByVal decreaseAllowanceFunction As DecreaseAllowanceFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of DecreaseAllowanceFunction)(decreaseAllowanceFunction, cancellationToken)
        
        End Function

        
        Public Function DecreaseAllowanceRequestAsync(ByVal [spender] As String, ByVal [subtractedValue] As BigInteger) As Task(Of String)
        
            Dim decreaseAllowanceFunction = New DecreaseAllowanceFunction()
                decreaseAllowanceFunction.Spender = [spender]
                decreaseAllowanceFunction.SubtractedValue = [subtractedValue]
            
            Return ContractHandler.SendRequestAsync(Of DecreaseAllowanceFunction)(decreaseAllowanceFunction)
        
        End Function

        
        Public Function DecreaseAllowanceRequestAndWaitForReceiptAsync(ByVal [spender] As String, ByVal [subtractedValue] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim decreaseAllowanceFunction = New DecreaseAllowanceFunction()
                decreaseAllowanceFunction.Spender = [spender]
                decreaseAllowanceFunction.SubtractedValue = [subtractedValue]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of DecreaseAllowanceFunction)(decreaseAllowanceFunction, cancellationToken)
        
        End Function
        Public Function DisableMetaTxnsRequestAsync(ByVal disableMetaTxnsFunction As DisableMetaTxnsFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of DisableMetaTxnsFunction)(disableMetaTxnsFunction)
        
        End Function

        Public Function DisableMetaTxnsRequestAsync() As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of DisableMetaTxnsFunction)
        
        End Function

        Public Function DisableMetaTxnsRequestAndWaitForReceiptAsync(ByVal disableMetaTxnsFunction As DisableMetaTxnsFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of DisableMetaTxnsFunction)(disableMetaTxnsFunction, cancellationToken)
        
        End Function

        Public Function DisableMetaTxnsRequestAndWaitForReceiptAsync(ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of DisableMetaTxnsFunction)(Nothing, cancellationToken)
        
        End Function
        Public Function EnableMetaTxnsRequestAsync(ByVal enableMetaTxnsFunction As EnableMetaTxnsFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of EnableMetaTxnsFunction)(enableMetaTxnsFunction)
        
        End Function

        Public Function EnableMetaTxnsRequestAsync() As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of EnableMetaTxnsFunction)
        
        End Function

        Public Function EnableMetaTxnsRequestAndWaitForReceiptAsync(ByVal enableMetaTxnsFunction As EnableMetaTxnsFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of EnableMetaTxnsFunction)(enableMetaTxnsFunction, cancellationToken)
        
        End Function

        Public Function EnableMetaTxnsRequestAndWaitForReceiptAsync(ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of EnableMetaTxnsFunction)(Nothing, cancellationToken)
        
        End Function
        Public Function GetRoleAdminQueryAsync(ByVal getRoleAdminFunction As GetRoleAdminFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Return ContractHandler.QueryAsync(Of GetRoleAdminFunction, Byte())(getRoleAdminFunction, blockParameter)
        
        End Function

        
        Public Function GetRoleAdminQueryAsync(ByVal [role] As Byte(), ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte())
        
            Dim getRoleAdminFunction = New GetRoleAdminFunction()
                getRoleAdminFunction.Role = [role]
            
            Return ContractHandler.QueryAsync(Of GetRoleAdminFunction, Byte())(getRoleAdminFunction, blockParameter)
        
        End Function


        Public Function GrantRoleRequestAsync(ByVal grantRoleFunction As GrantRoleFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of GrantRoleFunction)(grantRoleFunction)
        
        End Function

        Public Function GrantRoleRequestAndWaitForReceiptAsync(ByVal grantRoleFunction As GrantRoleFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of GrantRoleFunction)(grantRoleFunction, cancellationToken)
        
        End Function

        
        Public Function GrantRoleRequestAsync(ByVal [role] As Byte(), ByVal [account] As String) As Task(Of String)
        
            Dim grantRoleFunction = New GrantRoleFunction()
                grantRoleFunction.Role = [role]
                grantRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAsync(Of GrantRoleFunction)(grantRoleFunction)
        
        End Function

        
        Public Function GrantRoleRequestAndWaitForReceiptAsync(ByVal [role] As Byte(), ByVal [account] As String, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim grantRoleFunction = New GrantRoleFunction()
                grantRoleFunction.Role = [role]
                grantRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of GrantRoleFunction)(grantRoleFunction, cancellationToken)
        
        End Function
        Public Function HasRoleQueryAsync(ByVal hasRoleFunction As HasRoleFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Return ContractHandler.QueryAsync(Of HasRoleFunction, Boolean)(hasRoleFunction, blockParameter)
        
        End Function

        
        Public Function HasRoleQueryAsync(ByVal [role] As Byte(), ByVal [account] As String, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Dim hasRoleFunction = New HasRoleFunction()
                hasRoleFunction.Role = [role]
                hasRoleFunction.Account = [account]
            
            Return ContractHandler.QueryAsync(Of HasRoleFunction, Boolean)(hasRoleFunction, blockParameter)
        
        End Function


        Public Function IncreaseAllowanceRequestAsync(ByVal increaseAllowanceFunction As IncreaseAllowanceFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of IncreaseAllowanceFunction)(increaseAllowanceFunction)
        
        End Function

        Public Function IncreaseAllowanceRequestAndWaitForReceiptAsync(ByVal increaseAllowanceFunction As IncreaseAllowanceFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of IncreaseAllowanceFunction)(increaseAllowanceFunction, cancellationToken)
        
        End Function

        
        Public Function IncreaseAllowanceRequestAsync(ByVal [spender] As String, ByVal [addedValue] As BigInteger) As Task(Of String)
        
            Dim increaseAllowanceFunction = New IncreaseAllowanceFunction()
                increaseAllowanceFunction.Spender = [spender]
                increaseAllowanceFunction.AddedValue = [addedValue]
            
            Return ContractHandler.SendRequestAsync(Of IncreaseAllowanceFunction)(increaseAllowanceFunction)
        
        End Function

        
        Public Function IncreaseAllowanceRequestAndWaitForReceiptAsync(ByVal [spender] As String, ByVal [addedValue] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim increaseAllowanceFunction = New IncreaseAllowanceFunction()
                increaseAllowanceFunction.Spender = [spender]
                increaseAllowanceFunction.AddedValue = [addedValue]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of IncreaseAllowanceFunction)(increaseAllowanceFunction, cancellationToken)
        
        End Function
        Public Function IsTrustedForwarderQueryAsync(ByVal isTrustedForwarderFunction As IsTrustedForwarderFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Return ContractHandler.QueryAsync(Of IsTrustedForwarderFunction, Boolean)(isTrustedForwarderFunction, blockParameter)
        
        End Function

        
        Public Function IsTrustedForwarderQueryAsync(ByVal [forwarder] As String, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Dim isTrustedForwarderFunction = New IsTrustedForwarderFunction()
                isTrustedForwarderFunction.Forwarder = [forwarder]
            
            Return ContractHandler.QueryAsync(Of IsTrustedForwarderFunction, Boolean)(isTrustedForwarderFunction, blockParameter)
        
        End Function


        Public Function MaxSupplyQueryAsync(ByVal maxSupplyFunction As MaxSupplyFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of MaxSupplyFunction, BigInteger)(maxSupplyFunction, blockParameter)
        
        End Function

        
        Public Function MaxSupplyQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            return ContractHandler.QueryAsync(Of MaxSupplyFunction, BigInteger)(Nothing, blockParameter)
        
        End Function



        Public Function MetaTxnsEnabledQueryAsync(ByVal metaTxnsEnabledFunction As MetaTxnsEnabledFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Return ContractHandler.QueryAsync(Of MetaTxnsEnabledFunction, Boolean)(metaTxnsEnabledFunction, blockParameter)
        
        End Function

        
        Public Function MetaTxnsEnabledQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            return ContractHandler.QueryAsync(Of MetaTxnsEnabledFunction, Boolean)(Nothing, blockParameter)
        
        End Function



        Public Function MintRequestAsync(ByVal mintFunction As MintFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of MintFunction)(mintFunction)
        
        End Function

        Public Function MintRequestAndWaitForReceiptAsync(ByVal mintFunction As MintFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of MintFunction)(mintFunction, cancellationToken)
        
        End Function

        
        Public Function MintRequestAsync(ByVal [to] As String, ByVal [amount] As BigInteger) As Task(Of String)
        
            Dim mintFunction = New MintFunction()
                mintFunction.To = [to]
                mintFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAsync(Of MintFunction)(mintFunction)
        
        End Function

        
        Public Function MintRequestAndWaitForReceiptAsync(ByVal [to] As String, ByVal [amount] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim mintFunction = New MintFunction()
                mintFunction.To = [to]
                mintFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of MintFunction)(mintFunction, cancellationToken)
        
        End Function
        Public Function NameQueryAsync(ByVal nameFunction As NameFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            Return ContractHandler.QueryAsync(Of NameFunction, String)(nameFunction, blockParameter)
        
        End Function

        
        Public Function NameQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            return ContractHandler.QueryAsync(Of NameFunction, String)(Nothing, blockParameter)
        
        End Function



        Public Function NoncesQueryAsync(ByVal noncesFunction As NoncesFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of NoncesFunction, BigInteger)(noncesFunction, blockParameter)
        
        End Function

        
        Public Function NoncesQueryAsync(ByVal [owner] As String, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Dim noncesFunction = New NoncesFunction()
                noncesFunction.Owner = [owner]
            
            Return ContractHandler.QueryAsync(Of NoncesFunction, BigInteger)(noncesFunction, blockParameter)
        
        End Function


        Public Function PauseRequestAsync(ByVal pauseFunction As PauseFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of PauseFunction)(pauseFunction)
        
        End Function

        Public Function PauseRequestAsync() As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of PauseFunction)
        
        End Function

        Public Function PauseRequestAndWaitForReceiptAsync(ByVal pauseFunction As PauseFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PauseFunction)(pauseFunction, cancellationToken)
        
        End Function

        Public Function PauseRequestAndWaitForReceiptAsync(ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PauseFunction)(Nothing, cancellationToken)
        
        End Function
        Public Function PausedQueryAsync(ByVal pausedFunction As PausedFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Return ContractHandler.QueryAsync(Of PausedFunction, Boolean)(pausedFunction, blockParameter)
        
        End Function

        
        Public Function PausedQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            return ContractHandler.QueryAsync(Of PausedFunction, Boolean)(Nothing, blockParameter)
        
        End Function



        Public Function PermitRequestAsync(ByVal permitFunction As PermitFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of PermitFunction)(permitFunction)
        
        End Function

        Public Function PermitRequestAndWaitForReceiptAsync(ByVal permitFunction As PermitFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PermitFunction)(permitFunction, cancellationToken)
        
        End Function

        
        Public Function PermitRequestAsync(ByVal [owner] As String, ByVal [spender] As String, ByVal [value] As BigInteger, ByVal [deadline] As BigInteger, ByVal [v] As Byte, ByVal [r] As Byte(), ByVal [s] As Byte()) As Task(Of String)
        
            Dim permitFunction = New PermitFunction()
                permitFunction.Owner = [owner]
                permitFunction.Spender = [spender]
                permitFunction.Value = [value]
                permitFunction.Deadline = [deadline]
                permitFunction.V = [v]
                permitFunction.R = [r]
                permitFunction.S = [s]
            
            Return ContractHandler.SendRequestAsync(Of PermitFunction)(permitFunction)
        
        End Function

        
        Public Function PermitRequestAndWaitForReceiptAsync(ByVal [owner] As String, ByVal [spender] As String, ByVal [value] As BigInteger, ByVal [deadline] As BigInteger, ByVal [v] As Byte, ByVal [r] As Byte(), ByVal [s] As Byte(), ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim permitFunction = New PermitFunction()
                permitFunction.Owner = [owner]
                permitFunction.Spender = [spender]
                permitFunction.Value = [value]
                permitFunction.Deadline = [deadline]
                permitFunction.V = [v]
                permitFunction.R = [r]
                permitFunction.S = [s]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of PermitFunction)(permitFunction, cancellationToken)
        
        End Function
        Public Function RenounceRoleRequestAsync(ByVal renounceRoleFunction As RenounceRoleFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of RenounceRoleFunction)(renounceRoleFunction)
        
        End Function

        Public Function RenounceRoleRequestAndWaitForReceiptAsync(ByVal renounceRoleFunction As RenounceRoleFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RenounceRoleFunction)(renounceRoleFunction, cancellationToken)
        
        End Function

        
        Public Function RenounceRoleRequestAsync(ByVal [role] As Byte(), ByVal [account] As String) As Task(Of String)
        
            Dim renounceRoleFunction = New RenounceRoleFunction()
                renounceRoleFunction.Role = [role]
                renounceRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAsync(Of RenounceRoleFunction)(renounceRoleFunction)
        
        End Function

        
        Public Function RenounceRoleRequestAndWaitForReceiptAsync(ByVal [role] As Byte(), ByVal [account] As String, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim renounceRoleFunction = New RenounceRoleFunction()
                renounceRoleFunction.Role = [role]
                renounceRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RenounceRoleFunction)(renounceRoleFunction, cancellationToken)
        
        End Function
        Public Function RescueTokensRequestAsync(ByVal rescueTokensFunction As RescueTokensFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of RescueTokensFunction)(rescueTokensFunction)
        
        End Function

        Public Function RescueTokensRequestAndWaitForReceiptAsync(ByVal rescueTokensFunction As RescueTokensFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RescueTokensFunction)(rescueTokensFunction, cancellationToken)
        
        End Function

        
        Public Function RescueTokensRequestAsync(ByVal [token] As String, ByVal [value] As BigInteger) As Task(Of String)
        
            Dim rescueTokensFunction = New RescueTokensFunction()
                rescueTokensFunction.Token = [token]
                rescueTokensFunction.Value = [value]
            
            Return ContractHandler.SendRequestAsync(Of RescueTokensFunction)(rescueTokensFunction)
        
        End Function

        
        Public Function RescueTokensRequestAndWaitForReceiptAsync(ByVal [token] As String, ByVal [value] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim rescueTokensFunction = New RescueTokensFunction()
                rescueTokensFunction.Token = [token]
                rescueTokensFunction.Value = [value]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RescueTokensFunction)(rescueTokensFunction, cancellationToken)
        
        End Function
        Public Function RevokeRoleRequestAsync(ByVal revokeRoleFunction As RevokeRoleFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of RevokeRoleFunction)(revokeRoleFunction)
        
        End Function

        Public Function RevokeRoleRequestAndWaitForReceiptAsync(ByVal revokeRoleFunction As RevokeRoleFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RevokeRoleFunction)(revokeRoleFunction, cancellationToken)
        
        End Function

        
        Public Function RevokeRoleRequestAsync(ByVal [role] As Byte(), ByVal [account] As String) As Task(Of String)
        
            Dim revokeRoleFunction = New RevokeRoleFunction()
                revokeRoleFunction.Role = [role]
                revokeRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAsync(Of RevokeRoleFunction)(revokeRoleFunction)
        
        End Function

        
        Public Function RevokeRoleRequestAndWaitForReceiptAsync(ByVal [role] As Byte(), ByVal [account] As String, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim revokeRoleFunction = New RevokeRoleFunction()
                revokeRoleFunction.Role = [role]
                revokeRoleFunction.Account = [account]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of RevokeRoleFunction)(revokeRoleFunction, cancellationToken)
        
        End Function
        Public Function SupportsInterfaceQueryAsync(ByVal supportsInterfaceFunction As SupportsInterfaceFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Return ContractHandler.QueryAsync(Of SupportsInterfaceFunction, Boolean)(supportsInterfaceFunction, blockParameter)
        
        End Function

        
        Public Function SupportsInterfaceQueryAsync(ByVal [interfaceId] As Byte(), ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Boolean)
        
            Dim supportsInterfaceFunction = New SupportsInterfaceFunction()
                supportsInterfaceFunction.InterfaceId = [interfaceId]
            
            Return ContractHandler.QueryAsync(Of SupportsInterfaceFunction, Boolean)(supportsInterfaceFunction, blockParameter)
        
        End Function


        Public Function SymbolQueryAsync(ByVal symbolFunction As SymbolFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            Return ContractHandler.QueryAsync(Of SymbolFunction, String)(symbolFunction, blockParameter)
        
        End Function

        
        Public Function SymbolQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            return ContractHandler.QueryAsync(Of SymbolFunction, String)(Nothing, blockParameter)
        
        End Function



        Public Function TotalSupplyQueryAsync(ByVal totalSupplyFunction As TotalSupplyFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            Return ContractHandler.QueryAsync(Of TotalSupplyFunction, BigInteger)(totalSupplyFunction, blockParameter)
        
        End Function

        
        Public Function TotalSupplyQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of BigInteger)
        
            return ContractHandler.QueryAsync(Of TotalSupplyFunction, BigInteger)(Nothing, blockParameter)
        
        End Function



        Public Function TransferRequestAsync(ByVal transferFunction As TransferFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of TransferFunction)(transferFunction)
        
        End Function

        Public Function TransferRequestAndWaitForReceiptAsync(ByVal transferFunction As TransferFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of TransferFunction)(transferFunction, cancellationToken)
        
        End Function

        
        Public Function TransferRequestAsync(ByVal [to] As String, ByVal [amount] As BigInteger) As Task(Of String)
        
            Dim transferFunction = New TransferFunction()
                transferFunction.To = [to]
                transferFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAsync(Of TransferFunction)(transferFunction)
        
        End Function

        
        Public Function TransferRequestAndWaitForReceiptAsync(ByVal [to] As String, ByVal [amount] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim transferFunction = New TransferFunction()
                transferFunction.To = [to]
                transferFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of TransferFunction)(transferFunction, cancellationToken)
        
        End Function
        Public Function TransferFromRequestAsync(ByVal transferFromFunction As TransferFromFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of TransferFromFunction)(transferFromFunction)
        
        End Function

        Public Function TransferFromRequestAndWaitForReceiptAsync(ByVal transferFromFunction As TransferFromFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of TransferFromFunction)(transferFromFunction, cancellationToken)
        
        End Function

        
        Public Function TransferFromRequestAsync(ByVal [from] As String, ByVal [to] As String, ByVal [amount] As BigInteger) As Task(Of String)
        
            Dim transferFromFunction = New TransferFromFunction()
                transferFromFunction.From = [from]
                transferFromFunction.To = [to]
                transferFromFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAsync(Of TransferFromFunction)(transferFromFunction)
        
        End Function

        
        Public Function TransferFromRequestAndWaitForReceiptAsync(ByVal [from] As String, ByVal [to] As String, ByVal [amount] As BigInteger, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Dim transferFromFunction = New TransferFromFunction()
                transferFromFunction.From = [from]
                transferFromFunction.To = [to]
                transferFromFunction.Amount = [amount]
            
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of TransferFromFunction)(transferFromFunction, cancellationToken)
        
        End Function
        Public Function UnpauseRequestAsync(ByVal unpauseFunction As UnpauseFunction) As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of UnpauseFunction)(unpauseFunction)
        
        End Function

        Public Function UnpauseRequestAsync() As Task(Of String)
                    
            Return ContractHandler.SendRequestAsync(Of UnpauseFunction)
        
        End Function

        Public Function UnpauseRequestAndWaitForReceiptAsync(ByVal unpauseFunction As UnpauseFunction, ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of UnpauseFunction)(unpauseFunction, cancellationToken)
        
        End Function

        Public Function UnpauseRequestAndWaitForReceiptAsync(ByVal Optional cancellationToken As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return ContractHandler.SendRequestAndWaitForReceiptAsync(Of UnpauseFunction)(Nothing, cancellationToken)
        
        End Function
    
    End Class

End Namespace
