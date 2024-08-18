import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Button, Table, Tag} from "antd";

const COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (isActive) => {
            if (isActive) {
                return (
                    <Tag color="#52c41a">
                        Active
                    </Tag>
                );
            }
            return (
                <Tag color="#f5222d">
                    Inactive
                </Tag>
            );
        }
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
            if (record.status) {
                return (
                    <div className="flex">
                        <Button type="primary">Transfer Ether</Button>
                    </div>
                );
            }
        }
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        status: true
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        status: false
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        status: true
    },
];




export const Home = () => {
    const authContext = useContext(AuthContext);

    const [columns, setColumns] = useState(COLUMNS);
    const [tableData, setTableData] = useState(data);

    return (
        <div>
            <div className="flex items-center justify-center h-[50px] bg-red-300 text-3xl">
                <div>
                    Address: {authContext.account}
                </div>
            </div>
            {/*{!!authContext.account &&*/}
            {/*    <div className="flex justify-center mt-[80px] text-xl">*/}
            {/*        Your Balance: {authContext.myBalance}*/}
            {/*    </div>*/}
            {/*}*/}
            <div className="mt-[40px] flex justify-center">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}
