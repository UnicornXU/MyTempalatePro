import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
// React 文本对比
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Ribbon } from '@/components/AntExtend';
// MyTable
import MyTable from '@/components/MyTable';
// 请求
import { getInventoryView } from '@/services/apiUrls';
// 公共方法
import { bubbleSort, selectSort, uniqueArr, search, Expression } from '@/utils/comhelper';
// react-query


import styles from './Welcome.less';
import '@/reactviewdiff.less';

const data = [{
    "FieldValueId": 0,
    "FieldValueSettingId": 16731,
    "FieldValueCode": "LastPurchasingPrice",
    "FieldValueName": "最新订单采购价",
    "FieldDefaultValue": 0.0000,
    "Priority": 1,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16768,
    "FieldValueCode": "LastPurchasingPrice",
    "FieldValueName": "最新订单采购价",
    "FieldDefaultValue": 0.0000,
    "Priority": 1,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16732,
    "FieldValueCode": "LastPrice",
    "FieldValueName": "最后销单价",
    "FieldDefaultValue": 0.0000,
    "Priority": 2,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16769,
    "FieldValueCode": "LastPrice",
    "FieldValueName": "最后销单价",
    "FieldDefaultValue": 0.0000,
    "Priority": 2,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16733,
    "FieldValueCode": "DefaultSupplierQuotation",
    "FieldValueName": "默认供应商报价",
    "FieldDefaultValue": 0.0000,
    "Priority": 3,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16770,
    "FieldValueCode": "DefaultSupplierQuotation",
    "FieldValueName": "默认供应商报价",
    "FieldDefaultValue": 0.0000,
    "Priority": 3,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16734,
    "FieldValueCode": "DefaultValueSetting",
    "FieldValueName": "默认设置",
    "FieldDefaultValue": 0.0000,
    "Priority": 4,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16771,
    "FieldValueCode": "DefaultValueSetting",
    "FieldValueName": "默认设置",
    "FieldDefaultValue": 0.0000,
    "Priority": 4,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16735,
    "FieldValueCode": "DefaultValue",
    "FieldValueName": "固定值",
    "FieldDefaultValue": 0.0000,
    "Priority": 5,
    "FieldDefaultValueSettingViews": []
}, {
    "FieldValueId": 0,
    "FieldValueSettingId": 16772,
    "FieldValueCode": "DefaultValue",
    "FieldValueName": "固定值",
    "FieldDefaultValue": 0.0000,
    "Priority": 5,
    "FieldDefaultValueSettingViews": []
}];

const Prism = (window as any).Prism
const oldCode = `import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import TableHeader from '@/Components/public/TableHeader';
import { Popover, Row, Table, Tooltip, Empty } from 'antd';
import Ellipsis from '@/Components/Ellipsis';
import style from './index.less'
import CountryFlag from '@/Components/public/CountryFLag';
import { SearchDataChangeHistoryApi } from '@/apis';
import { empty } from '@/kits/other';
const getWareHouseListColumns = () => {

    const [modalVisible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const searchData = async (visible: any, record: any) => {
        if (!visible) {
            setVisible(false);
            setData([]);
            return;
        }
        let param = {
            input: {
                orderSourceId: record.product?.orderSourceId,
                "orderSourceSku": record.product?.orderSourceSku,
                "ChkItemName": "fbaAvailable"
            }

        };
        let res = await SearchDataChangeHistoryApi(param);
        if (res.length > 0) {
            setData(res);
            setVisible(true);
        } else {
            setData([])
        }
    }

    let columns: ProColumns[] = [
        {
            title: <TableHeader>图片</TableHeader>,
            dataIndex: 'imageUrl',
            width: 60,
            align: "center",
            fixed: true,
            render: (val: any, record: any) => {
                console.log(val)
                if (val == "-") {
                    return (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无图片" />
                    )
                } else {
                    return (
                        <Tooltip color="white" placement="right"
                            title={<img src={val} style={{ width: "150px" }} />}
                        >
                            <img src={val} style={{ width: "50px" }} />
                        </Tooltip>
                    )
                }
            }

        },
        {
            title: <TableHeader>产品信息</TableHeader>,
            dataIndex: 'product',
            key: 'product',
            fixed: true,
            width: 300,
            align: 'center',
            render: (val: any, record: any) => {
                let product = record.product || {};
                return (
                    <div style={{ textAlign: "left" }}>
                        <Row align="middle">
                            <CountryFlag countryCode={product.country} className={style.flag} />
                            <div className={style.blueText}>{product.orderSourceName}</div>
                        </Row>
                        <Ellipsis lines={2} tooltip className={style.blueText}>{product.title}</Ellipsis>
                        <div className={style.blueText}>{product.asin}/{product.orderSourceSku}</div>
                        <div className={style.blueText}>FNSKU：{product.fnSku}</div>
                    </div>
                )
            }
        },
        {
            title: <TableHeader tooltip="库存金额=可用库存*默认供货价">FBA可用</TableHeader>,
            dataIndex: 'fbaAvailable',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <Popover
                        placement="right"
                        id="tablePopover"
                        onVisibleChange={visible =>
                            searchData(visible, record)
                        }
                        content={

                            <div>
                                {data.length > 0 &&
                                    <Table
                                        bordered
                                        columns={[
                                            {
                                                title: "更新时间",
                                                width: 130,
                                                align: "center",
                                                dataIndex: "updateTime",
                                                render: (val: any, record: any) => empty(val) ? "-" :
                                                    <>
                                                        <div>{val.substring(0, 10)}</div>
                                                        <div>{val.substring(11, 19)}</div>
                                                    </>
                                            },
                                            {
                                                title: "FBA可用",
                                                width: 100,
                                                align: "center",
                                                dataIndex: "currentValue",
                                            },
                                            {
                                                title: "库存变化",
                                                width: 100,
                                                align: "center",
                                                dataIndex: "changeNum",
                                            }
                                        ]}
                                        dataSource={data}
                                        pagination={false}
                                    />
                                }
                            </div>

                        }>
                        <div style={{ cursor: "pointer" }}>
                            <div className={style.blueText}>{arr?.[0]}</div>
                            <div className={style.blueText}>{arr?.[1]}</div>
                        </div>
                    </Popover>)
            }
        },
        {
            title: <TableHeader tooltip={<><div>在仓库存=FBA可用+待调仓+调仓中+入库中</div><div>在仓库存金额=在仓库存*默认供货价</div></>}>在仓库存</TableHeader>,
            dataIndex: 'inventory',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip={<><div>运输途中=发出数量-已收货数量</div><div>运输途中金额=运输途中*默认供货价</div></>}>运输途中</TableHeader>,
            dataIndex: 'delivering',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>结果表示按照最近30天的销售速度，全链条库存售完需要的总天数。</div>
                        <div>周转天数=（在仓库存+运输途中）/（近30天销量/30）</div>
                    </>}
            >近30天周转天数</TableHeader>,
            dataIndex: 'expectedSalesDays',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>反映亚马逊库存最近30天流动的速度的数据，结果表示按照最近30天的销售速度，每30天可以售完当前亚马逊库存的次数。</div>
                        <div>周转次数=30/周转天数=（在仓库存+运输途中）/近30天销量</div>
                    </>}
            >近30天周转次数</TableHeader>,
            dataIndex: 'expectedSalesFrequency',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="售出率为在过去 90 天内售出和配送的商品数量除以此段时间内亚马逊运营中心的平均可售库存量。追踪售出率可帮助您确定是否需要采取措施来提高商品的浏览量或转化率。">近90天售出率</TableHeader>,
            dataIndex: 'sellThrough',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>计冗余商品数量是根据您当前的销售速度和买家需求预测得出的积压商品数量。保留这些商品并支付仓储费比通过降低价格或移除商品来降低商品数量的成本更高。</div>
                        <div>预计冗余商品金额=预计冗余商品数*默认供货价</div>
                    </>}
            >预计冗余商品数量</TableHeader>,
            dataIndex: 'estimatedExcessQty',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="0-90天库龄库存金额=0-90天库龄库存*默认供货价">0-90天库龄</TableHeader>,
            dataIndex: 'invAge0To90Days',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <Popover placement="right" id="tablePopover"
                        content={
                            <Table
                                bordered
                                columns={[
                                    {
                                        title: "0-30天库龄",
                                        width: 130,
                                        align: "center",
                                        dataIndex: "invAge0To30Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    },
                                    {
                                        title: "31-60天库龄",
                                        width: 100,
                                        align: "center",
                                        dataIndex: "invAge31To60Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    },
                                    {
                                        title: "61-90天库龄",
                                        width: 100,
                                        align: "center",
                                        dataIndex: "invAge61To90Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    }
                                ]}
                                dataSource={[
                                    { invAge0To30Days: record.invAge0To30Days, invAge31To60Days: record.invAge31To60Days, invAge61To90Days: record.invAge61To90Days },
                                ]}
                                pagination={false}
                            />
                        }>

                        <div style={{ cursor: "pointer" }}>
                            <div className={style.blueText}>{arr?.[0]}</div>
                            <div className={style.blueText}>{arr?.[1]}</div>
                        </div>

                    </Popover>
                )
            }
        },
        {
            title: <TableHeader tooltip="91-180天库龄库存金额=91-180天库龄库存*默认供货价">91-180天库龄</TableHeader>,
            dataIndex: 'invAge91To180Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="181-270天库龄库存金额=181-270天库龄库存*默认供货价">181-270天库龄</TableHeader>,
            dataIndex: 'invAge181To270Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="271-365天库龄库存金额=271-365天库龄库存*默认供货价">271-365天库龄</TableHeader>,
            dataIndex: 'invAge271To365Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="＞365天库龄库存金额=＞365天库龄库存*默认供货价">＞365天库龄</TableHeader>,
            dataIndex: 'invAge365PlusDays',
            width: 120,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="">昨日销量</TableHeader>,
            dataIndex: 'salesNumYesterday',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近7天销量</TableHeader>,
            dataIndex: 'clientIp',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近30天销量</TableHeader>,
            dataIndex: 'salesNumThirtyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近60天销量</TableHeader>,
            dataIndex: 'salesNumSixtyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近90天销量</TableHeader>,
            dataIndex: 'salesNumNinetyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">建议紧急补货</TableHeader>,
            dataIndex: 'monitorSotckFinalNum',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">建议正常补货</TableHeader>,
            dataIndex: 'recommandFinalNum',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>当此商品存在低流量或低转化率提醒时显示。</div>
                        <div>低流量表明只有少数潜在买家查看了该商品信息。</div>
                        <div>低转化率表明潜在买家查看了商品信息但最后并未购买商品。</div>
                    </>}
            >警告状态</TableHeader>,
            dataIndex: 'alert',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="建议您对库存执行的操作。建议的依据是您当前的买家需求以及采取措施是否比不采取任何措施花费更低。">建议操作</TableHeader>,
            dataIndex: 'RecommendedAction',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="可设置仓储限制的商品仓储类型分类。">仓储类型</TableHeader>,
            dataIndex: 'storageType',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="此 ASIN 应支付的每月库存仓储费金额">月仓储费</TableHeader>,
            dataIndex: 'estimatedMonthlyStorageFee',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>长期仓储数量：在运营中心存放时间 6-12个月并进行长期仓储费评估的可售商品数量。</div>
                        <div>长期仓储费：针对在运营中心存放 6-12个月的商品收取的长期仓储费。</div>
                    </>}
            >
                <div>长期仓储费</div>
                <span>（6-12个月）</span>
            </TableHeader>,
            dataIndex: 'fee6MoLongTermStorage',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>长期仓储数量：在运营中心存放时间 365 天以上并进行长期仓储费评估的可售商品数量。</div>
                        <div>长期仓储费：针对在运营中心存放 365 天以上的商品收取的长期仓储费。</div>
                    </>}
            >
                <div>长期仓储费</div>
                <span>（＞12个月）</span></TableHeader>,
            dataIndex: 'fee12MoLongTermStorage',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="特定仓储类型在收费日期产生的库存仓储超量费金额。">库存仓储超量费</TableHeader>,
            dataIndex: 'chargedFeeAmount',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>预计长期仓储数量：截至下一收费日期（每月 15 日），已在运营中心存放超过 365 天的可售商品数量</div>
                        <div>预计长期仓储费：截至下一收费日期（每月 15 日），已在运营中心存放超过 365 天的商品的预计长期仓储费</div>
                    </>}
            >预计长期仓储</TableHeader>,
            dataIndex: 'projectedLtsf12Mon',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
    ]
    return columns
}

export default getWareHouseListColumns;
`;
const newCode = `
import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import TableHeader from '@/Components/public/TableHeader';
import { Popover, Row, Table, Tooltip, Empty } from 'antd';
import Ellipsis from '@/Components/Ellipsis';
import style from './index.less'
import CountryFlag from '@/Components/public/CountryFLag';
import { SearchDataChangeHistoryApi } from '@/apis';
import { empty } from '@/kits/other';
const getWareHouseListColumns = () => {

    const [modalVisible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const searchData = async (visible: any, record: any) => {
        if (!visible) {
            setVisible(false);
            setData([]);
            return;
        }
        let param = {
            input: {
                orderSourceId: record.product?.orderSourceId,
                "orderSourceSku": record.product?.orderSourceSku,
                "ChkItemName": "fbaAvailable"
            }

        };
        let res = await SearchDataChangeHistoryApi(param);
        if (res.length > 0) {
            setData(res);
            setVisible(true);
        } else {
            setData([])
        }
    }

    let columns: ProColumns[] = [
        {
            title: <TableHeader>图片</TableHeader>,
            dataIndex: 'imageUrl',
            width: 60,
            align: "center",
            fixed: true,
            render: (val: any, record: any) => {
                if (val == "-") {
                    return (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无图片" />
                    )
                } else {
                    return (
                        <Tooltip color="white" placement="right"
                            title={<img src={val} style={{ width: "150px" }} />}
                        >
                            <img src={val} style={{ width: "50px" }} />
                        </Tooltip>
                    )
                }
            }

        },
        {
            title: <TableHeader>产品信息</TableHeader>,
            dataIndex: 'product',
            key: 'product',
            fixed: true,
            width: 300,
            align: 'center',
            render: (val: any, record: any) => {
                let product = record.product || {};
                return (
                    <div style={{ textAlign: "left" }}>
                        <Row align="middle">
                            <CountryFlag countryCode={product.country} className={style.flag} />
                            <div className={style.blueText}>{product.orderSourceName}</div>
                        </Row>
                        <Ellipsis lines={2} tooltip className={style.blueText}>{product.title}</Ellipsis>
                        <div className={style.blueText}>{product.asin}/{product.orderSourceSku}</div>
                        <div className={style.blueText}>FNSKU：{product.fnSku}</div>
                    </div>
                )
            }
        },
        {
            title: <TableHeader tooltip="库存金额=可用库存*默认供货价">FBA可用</TableHeader>,
            dataIndex: 'fbaAvailable',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <Popover
                        placement="right"
                        id="tablePopover"
                        onVisibleChange={visible =>
                            searchData(visible, record)
                        }
                        content={

                            <div>
                                {data.length > 0 &&
                                    <Table
                                        bordered
                                        columns={[
                                            {
                                                title: "更新时间",
                                                width: 130,
                                                align: "center",
                                                dataIndex: "updateTime",
                                                render: (val: any, record: any) => empty(val) ? "-" :
                                                    <>
                                                        <div>{val.substring(0, 10)}</div>
                                                        <div>{val.substring(11, 19)}</div>
                                                    </>
                                            },
                                            {
                                                title: "FBA可用",
                                                width: 100,
                                                align: "center",
                                                dataIndex: "currentValue",
                                            },
                                            {
                                                title: "库存变化",
                                                width: 100,
                                                align: "center",
                                                dataIndex: "changeNum",
                                            }
                                        ]}
                                        dataSource={data}
                                        pagination={false}
                                    />
                                }
                            </div>

                        }>
                        <div style={{ cursor: "pointer" }}>
                            <div className={style.blueText}>{arr?.[0]}</div>
                            <div className={style.blueText}>{arr?.[1]}</div>
                        </div>
                    </Popover>)
            }
        },
        {
            title: <TableHeader tooltip={<><div>在仓库存=FBA可用+待调仓+调仓中+入库中</div><div>在仓库存金额=在仓库存*默认供货价</div></>}>在仓库存</TableHeader>,
            dataIndex: 'inventory',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip={<><div>运输途中=发出数量-已收货数量</div><div>运输途中金额=运输途中*默认供货价</div></>}>运输途中</TableHeader>,
            dataIndex: 'delivering',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>结果表示按照最近30天的销售速度，全链条库存售完需要的总天数。</div>
                        <div>周转天数=（在仓库存+运输途中）/（近30天销量/30）</div>
                    </>}
            >近30天周转天数</TableHeader>,
            dataIndex: 'expectedSalesDays',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>反映亚马逊库存最近30天流动的速度的数据，结果表示按照最近30天的销售速度，每30天可以售完当前亚马逊库存的次数。</div>
                        <div>周转次数=30/周转天数=（在仓库存+运输途中）/近30天销量</div>
                    </>}
            >近30天周转次数</TableHeader>,
            dataIndex: 'expectedSalesFrequency',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="售出率为在过去 90 天内售出和配送的商品数量除以此段时间内亚马逊运营中心的平均可售库存量。追踪售出率可帮助您确定是否需要采取措施来提高商品的浏览量或转化率。">近90天售出率</TableHeader>,
            dataIndex: 'sellThrough',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>计冗余商品数量是根据您当前的销售速度和买家需求预测得出的积压商品数量。保留这些商品并支付仓储费比通过降低价格或移除商品来降低商品数量的成本更高。</div>
                        <div>预计冗余商品金额=预计冗余商品数*默认供货价</div>
                    </>}
            >预计冗余商品数量</TableHeader>,
            dataIndex: 'estimatedExcessQty',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="0-90天库龄库存金额=0-90天库龄库存*默认供货价">0-90天库龄</TableHeader>,
            dataIndex: 'invAge0To90Days',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <Popover placement="right" id="tablePopover"
                        content={
                            <Table
                                bordered
                                columns={[
                                    {
                                        title: "0-30天库龄",
                                        width: 130,
                                        align: "center",
                                        dataIndex: "invAge0To30Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    },
                                    {
                                        title: "31-60天库龄",
                                        width: 100,
                                        align: "center",
                                        dataIndex: "invAge31To60Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    },
                                    {
                                        title: "61-90天库龄",
                                        width: 100,
                                        align: "center",
                                        dataIndex: "invAge61To90Days",
                                        render: (val: any, record: any) => {
                                            let arr = val.split("\r\n");
                                            return (
                                                <>
                                                    <div className={style.grayTtext}>{arr?.[0]}</div>
                                                    <div className={style.grayTtext}>{arr?.[1]}</div>
                                                </>)
                                        }
                                    }
                                ]}
                                dataSource={[
                                    { invAge0To30Days: record.invAge0To30Days, invAge31To60Days: record.invAge31To60Days, invAge61To90Days: record.invAge61To90Days },
                                ]}
                                pagination={false}
                            />
                        }>

                        <div style={{ cursor: "pointer" }}>
                            <div className={style.blueText}>{arr?.[0]}</div>
                            <div className={style.blueText}>{arr?.[1]}</div>
                        </div>

                    </Popover>
                )
            }
        },
        {
            title: <TableHeader tooltip="91-180天库龄库存金额=91-180天库龄库存*默认供货价">91-180天库龄</TableHeader>,
            dataIndex: 'invAge91To180Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="181-270天库龄库存金额=181-270天库龄库存*默认供货价">181-270天库龄</TableHeader>,
            dataIndex: 'invAge181To270Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="271-365天库龄库存金额=271-365天库龄库存*默认供货价">271-365天库龄</TableHeader>,
            dataIndex: 'invAge271To365Days',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="＞365天库龄库存金额=＞365天库龄库存*默认供货价">＞365天库龄</TableHeader>,
            dataIndex: 'invAge365PlusDays',
            width: 120,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="">昨日销量</TableHeader>,
            dataIndex: 'salesNumYesterday',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近7天销量</TableHeader>,
            dataIndex: 'clientIp',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近30天销量</TableHeader>,
            dataIndex: 'salesNumThirtyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近60天销量</TableHeader>,
            dataIndex: 'salesNumSixtyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">近90天销量</TableHeader>,
            dataIndex: 'salesNumNinetyDay',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">建议紧急补货</TableHeader>,
            dataIndex: 'monitorSotckFinalNum',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="">建议正常补货</TableHeader>,
            dataIndex: 'recommandFinalNum',
            width: 110,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>当此商品存在低流量或低转化率提醒时显示。</div>
                        <div>低流量表明只有少数潜在买家查看了该商品信息。</div>
                        <div>低转化率表明潜在买家查看了商品信息但最后并未购买商品。</div>
                    </>}
            >警告状态</TableHeader>,
            dataIndex: 'alert',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="建议您对库存执行的操作。建议的依据是您当前的买家需求以及采取措施是否比不采取任何措施花费更低。">建议操作</TableHeader>,
            dataIndex: 'RecommendedAction',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="可设置仓储限制的商品仓储类型分类。">仓储类型</TableHeader>,
            dataIndex: 'storageType',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader tooltip="此 ASIN 应支付的每月库存仓储费金额">月仓储费</TableHeader>,
            dataIndex: 'estimatedMonthlyStorageFee',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>长期仓储数量：在运营中心存放时间 6-12个月并进行长期仓储费评估的可售商品数量。</div>
                        <div>长期仓储费：针对在运营中心存放 6-12个月的商品收取的长期仓储费。</div>
                    </>}
            >
                <div>长期仓储费</div>
                <span>（6-12个月）</span>
            </TableHeader>,
            dataIndex: 'fee6MoLongTermStorage',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>长期仓储数量：在运营中心存放时间 365 天以上并进行长期仓储费评估的可售商品数量。</div>
                        <div>长期仓储费：针对在运营中心存放 365 天以上的商品收取的长期仓储费。</div>
                    </>}
            >
                <div>长期仓储费</div>
                <span>（＞12个月）</span></TableHeader>,
            dataIndex: 'fee12MoLongTermStorage',
            width: 130,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
        {
            title: <TableHeader tooltip="特定仓储类型在收费日期产生的库存仓储超量费金额。">库存仓储超量费</TableHeader>,
            dataIndex: 'chargedFeeAmount',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => <div className={style.grayTtext}>{val}</div>
        },
        {
            title: <TableHeader
                tooltip={
                    <>
                        <div>预计长期仓储数量：截至下一收费日期（每月 15 日），已在运营中心存放超过 365 天的可售商品数量</div>
                        <div>预计长期仓储费：截至下一收费日期（每月 15 日），已在运营中心存放超过 365 天的商品的预计长期仓储费</div>
                    </>}
            >预计长期仓储</TableHeader>,
            dataIndex: 'projectedLtsf12Mon',
            width: 100,
            align: 'center',
            render: (val: any, record: any) => {
                let arr = val.split("\r\n");
                return (
                    <>
                        <div className={style.grayTtext}>{arr?.[0]}</div>
                        <div className={style.grayTtext}>{arr?.[1]}</div>
                    </>)
            }
        },
    ]
    return columns
}

export default getWareHouseListColumns;`;


const CodePreview: React.FC = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);


interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}

const Welcome: React.FC = () => {
    let tsDemo = isFish({ name: '苏轼', swim() { console.log(1) } });
    console.log(tsDemo, 'dd')
    const intl = useIntl();

    let res: number[] = bubbleSort([1, 2, 5, 8, 3, 0, 9, 6]);
    // 选择排序
    let res2: number[] = selectSort([1, 2, 5, 8, 3, 0, 9, 6]);
    let arr = uniqueArr([1, 1, 2, 3, 4, 4, 5, 6]);
    // 二分查找
    let searchres = search([1, 2, 3], 3);
    let object = {};
    // reduce去重
    let reduceData = data.reduce((item, next) => {
        object[next.FieldValueName] ? "" : object[next.FieldValueName] = true && item.push(next);
        return item;
    }, [])

    console.log(reduceData, '去重')



    console.log('res', res);
    console.log('res2', res2);
    console.log('arr', arr)
    console.log('searchres', searchres)


    const newStyles = {
        variables: {
            dark: {
                highlightBackground: '#fefed5',
                highlightGutterBackground: '#ffcd3c',
            },
        },
        line: {
            padding: '10px 2px',
            '&:hover': {
                background: '#a26ea1',
            },
        },

    }
    const syntaxHighlight = (str: string): any => {
        if (!str) return;
        return <span
            style={{ display: 'inline' }}
            dangerouslySetInnerHTML={{
                __html: Prism.highlight(str, Prism.languages.javascript),
            }}
        />;
    };

    let text = "Dear customer, so sorry for the inconvenience caused. We always want  to be a perfect seller but some time it is out of our control.\nWe agreed your dispute and Ali has refunded to you,it usually takes 3-20 business days to return to your account. If you don’t receive your refund, please contact Ali customer service for more help. https://service.aliexpress.com/page/home?pageId=17&language=en . \nHope you can forgive us. If you are satisfied with our service please give a 5 star  on overall detail selling rating[Rose]\nIf you need any further help please feel free to contact us. Thank you. Have nice day！[Smile][Tongue]"

    console.log(text.match(/\[[A-Z]*[a-z]*\]/g));
    let icons = text.match((/\[[A-Z]*[a-z]*\]/g));

    text = text.replace(/\[.+?\]/g, function (a, b) {
        console.log(a, 'dd')
        return Expression[a];
    });



    return (
        <PageContainer>
            <Card>
                <Ribbon
                    text="4.18.9"
                    content={
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    }
                />
                <MyTable
                    requestApi={getInventoryView}
                    params={{ "language": "zh_cn" }}
                    handleResData={(data: any) => {
                        return ({
                            list: data
                        })
                    }}
                    columns={[
                        {
                            title: '充值币别',
                            dataIndex: 'RechargeCurrency',
                            align: 'center',
                            render: (text, record, index) =>
                                !text ? '' : text.toLowerCase() || text,
                        },
                        {
                            title: '兑人民币汇率',
                            dataIndex: 'RBMExchangeRate',
                            align: 'center',
                        },
                        {
                            title: '最后操作人员',
                            dataIndex: 'LastModifier',
                            render: (text, record, index) => record.LastModifier || record.Creator,
                            align: 'center',
                        },
                        {
                            title: '最后更新时间',
                            dataIndex: 'LastModificationTime',
                            // render: (text, record, index) =>
                            //     getLocaleDay(record.LastModificationTime || record.CreationTime),
                            align: 'center',
                        },
                        {
                            title: '备注',
                            dataIndex: 'Remark',
                            align: 'center',
                        },
                        {
                            title: '操作',
                            dataIndex: 'Id',
                            align: 'center',
                            render: (text, record) => {
                                return (
                                    <div>11</div>
                                );
                            },
                        },
                    ]}
                />
                {/* <div style={{ marginBottom: '20px' }} className="diff-viewer">
                    <ReactDiffViewer
                        style={newStyles}
                        oldValue={oldCode}
                        newValue={newCode}
                        splitView={true}
                        useDarkTheme
                        renderContent={syntaxHighlight}
                        leftTitle="webpack.config.js master@2178133 - pushed 2 hours ago."
                        rightTitle="webpack.config.js master@64207ee - pushed 13 hours ago."
                    />
                </div> */}
            </Card>
        </PageContainer >
    );
};

export default Welcome;
