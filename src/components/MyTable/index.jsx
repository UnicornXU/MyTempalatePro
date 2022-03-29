import React from 'react';
import { Table, Tag, Space } from 'antd';
class MyTable extends React.Component {


    state = {
        resData: {},
        curPagination: {
            current: 1,
            pageSize: 20
        },
        curOrderBy: {},
        selectedRowKeys: []
    }

    // 初始化
    componentDidMount() {
        this.handleGetList();
    }



    // 分页查询
    handleTableChange = (pagination, filters, { order, field }) => {
        const defaultOrderBy = this.props.sorterBy || {};
        const orderMap = {
            ascend: '0',
            descend: '1',
        };
        this.setState({
            curPagination: {
                current: pagination?.current || 1,
                pageSize: pagination?.pageSize
            },
            curOrderBy: orderMap[order] ? defaultSort : {
                order: orderMap[order],
                field,
            }
        });
        // 请求接口
        this.handleGetList();
    }

    // 请求接口
    handleGetList = async () => {
        const { requestApi } = this.props;
        const curpagination = this.state.curPagination;
        const orderBy = this.state.curOrderBy;
        let params = Object.assign({}, this.props.params, { ...curpagination, ...orderBy });

        // 默认返回结果,防止报错页面空白
        const defaultRes = {
            list: [],
            pagination: {
                current: 1,
                pageSize: 20,
            }
        }

        if (this.props.handleParams) {
            params = this.props.handleParams(params) || params;
        }

        let res = requestApi && await requestApi(params)?.catch((error) => {
            console.log('error', error);
            return defaultRes;
        });

        try {
            this.props?.handleResData?.(res);
        } catch (error) {
            console.error('handleResData 函数 逻辑报错错误', error);
        }

        const resData = res && res.data || defaultRes;
        this.setState({
            resData
        })

        return resData;

    }






    render() {
        const { resData, curPagination } = this.state;
        const { columns, isSelectRow, ...restProps } = this.props;
        // 分页参数
        const handlePaginationChange = () => {

            const defaultSet = {
                current: curPagination.current,
                pageSize: curPagination.pageSize,
                total: resData?.pagination?.total,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: (resData?.pagination?.pageSizeOptions || []).map(String),
                showTotal: (total => `共 ${total} 条`)
            };

            return defaultSet;

        };
        // 处理列表
        const handleColumn = (columns) => {
            let newColumns = [];
            const orderMap = {
                0: 'ascend',
                1: 'descend',
            };
            columns.forEach((item) => {
                const newItem = {
                    ...item
                };
                if (item.sorter) {
                    newItem.sorter = curOrderBy.sorter;
                    newItem.sortOrder = orderBy.field === item.dataIndex && orderMap[orderBy.order];
                }
                // handleColumnItem && handleColumnItem(newItem, resData);

                newColumns.push(newItem);
            })
            return newColumns;
        };
        // 选择功能配置对象
        const rowSelectionObj = isSelectRow ? {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys });
            }

        } : undefined;

        return (
            <Table
                columns={handleColumn(columns)}
                dataSource={resData.list}
                bordered
                pagination={handlePaginationChange()}
                onChange={this.handleTableChange}
                rowSelection={rowSelectionObj}
                {...restProps}
            />
        )
    }
}
export default MyTable;