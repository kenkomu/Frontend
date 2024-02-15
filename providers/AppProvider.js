import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Contract } from 'starknet'
import { connect, disconnect } from 'starknetkit'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/config'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'

export const initialData = {
    contract: null ,
    account: null ,
    address: null ,
    connection: null ,
    handleConnetWalletBtnClick: null 
}

export const AppContext = createContext(initialData)

export const useAppContext = () => {
    return useContext(AppContext)
}



const AppProvider = ({ children }) => {

    const [contract, setContract] = useState() ;
    const [connection, setConnection] = useState() ;
    const [account, setAccount] = useState() ;
    const [address, setAddress] = useState ("");

    const connectWallet = async () => {
        const connection = await connect({
            webWalletUrl: "https://web.argent.xyz",
            dappName: "SmartLands",
        });

        if (connection && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);
        }
    };

    const disconnectWallet = async () => {
        await disconnect({ clearLastWallet: true });
        setConnection(null);
        setAccount(null);
        setAddress("");
    };


    const openConfirmDisconnectModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        centered: true,
        radius: "md",
        children: (
            <Text size="sm">
                Are you sure you want to disconnect your account?
            </Text>
        ),
        labels: { confirm: 'Disconnect', cancel: 'Cancel' },
        confirmProps: { radius: "md", variant: "light" },
        cancelProps: { radius: "md", variant: "light" },
        onCancel: () => { },
        onConfirm: () => disconnectWallet(),
    });


    const makeContractConnection = () => {
        let contract = null
        if (account) {
            contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, account)
            
        }
        else {
            contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        }
        setContract(contract)
    
    }
 

    const handleConnetWalletBtnClick = () => {
        console.log("clicked connect wallet")
        if (!account) {
            connectWallet()
        }
        else {

            disconnectWallet()

        }
    }

    const connectToStarknet = async () => {
        try {
        const connection = await connect({
            modalMode: "neverAsk",
            webWalletUrl: "https://web.argent.xyz",
            dappName: "Kiboko Offramp",
        
        
        });

        if (connection && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);
        }
    }catch(err){
console.log(err);
    }
    };

    const contextValue = useMemo(() => ({
        contract,
        account,
        address,
        connection,
        handleConnetWalletBtnClick
    }), [account, contract, address]);

    useEffect(() => {
       
        connectToStarknet();
    }, []);

    useEffect(() => {
        makeContractConnection()
    }, [account, address])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider