<template>
  <div class="main">
    <div class="title">半托管报价计算器</div>
    <div class="top">
      <div class="product-info">
        <div class="info-title">商品信息</div>
        <el-form
          :model="productInfo"
          label-width="120px"
          size="small"
          style="height: 75%; display: flex; flex-direction: column; justify-content: space-around"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="成本（含运费）">
                <el-input-number v-model.number="productInfo.cost" :precision="2" style="width: 100%"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="敏感属性">
                <el-select v-model="productInfo.sensitivity" placeholder="请选择敏感性质" style="width: 100%">
                  <el-option label="普货" :value="0"></el-option>
                  <el-option label="特货" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实重（g）">
                <el-input-number v-model.number="productInfo.actualWeight" :precision="2" style="width: 100%"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="长（cm）">
                <el-input-number v-model.number="productInfo.extent" :precision="2" style="width: 100%"> </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宽（cm）">
                <el-input-number v-model.number="productInfo.width" :precision="2" style="width: 100%"> </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="高（cm）">
                <el-input-number v-model.number="productInfo.height" :precision="2" style="width: 100%"> </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="base-info">
        <div class="info-title">基本信息</div>
        <el-table :data="baseInfo" border style="width: 100%" size="mini" :header-cell-style="{ 'background-color': 'black', color: '#fff' }">
          <el-table-column prop="startOperatingFee" label="物流商头程操作费" align="center" :key="baseInfo[0].startOperatingFee + '0'">
            <template>
              <el-input-number
                v-model.number="baseInfo[0].startOperatingFee"
                :precision="2"
                :controls="false"
                size="mini"
                :step="0.1"
                style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="endOperatingFee" label="物流商尾程操作费" align="center" :key="baseInfo[0].endOperatingFee + '1'">
            <template>
              <el-input-number
                v-model.number="baseInfo[0].endOperatingFee"
                :precision="2"
                :controls="false"
                size="mini"
                :step="0.1"
                style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="subsidy" label="低于30补贴" align="center" :key="baseInfo[0].subsidy + '2'">
            <template>
              <el-input-number
                v-model.number="baseInfo[0].subsidy"
                :precision="2"
                :controls="false"
                size="mini"
                :step="0.1"
                style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="空运重量费" align="center">
            <el-table-column prop="normalAirTransportFee" label="普货" width="100px" align="center" :key="baseInfo[0].normalAirTransportFee + '3'">
              <template>
                <el-input-number
                  v-model.number="baseInfo[0].normalAirTransportFee"
                  :precision="2"
                  :controls="false"
                  size="mini"
                  style="width: 100%"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="specialAirTransportFee" label="特货" width="100px" align="center" :key="baseInfo[0].specialAirTransportFee + '4'">
              <template>
                <el-input-number
                  v-model.number="baseInfo[0].specialAirTransportFee"
                  :precision="2"
                  :controls="false"
                  size="mini"
                  style="width: 100%"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="海运重量费" align="center">
            <el-table-column prop="normalSeaTransportFee" label="普货" width="100px" align="center" :key="baseInfo[0].normalSeaTransportFee + '5'">
              <template>
                <el-input-number
                  v-model.number="baseInfo[0].normalSeaTransportFee"
                  :precision="2"
                  :controls="false"
                  size="mini"
                  style="width: 100%"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="specialSeaTransportFee" label="特货" width="100px" align="center" :key="baseInfo[0].specialSeaTransportFee + '6'">
              <template>
                <el-input-number
                  v-model.number="baseInfo[0].specialSeaTransportFee"
                  :precision="2"
                  :controls="false"
                  size="mini"
                  style="width: 100%"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="dollarCurrencyRate" label="美元汇率" align="center" :key="baseInfo[0].dollarCurrencyRate + '7'">
            <template>
              <el-input-number
                v-model.number="baseInfo[0].dollarCurrencyRate"
                :precision="2"
                :controls="false"
                size="mini"
                :step="0.1"
                style="width: 100%"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="bottom">
      <div class="calc-fee">
        <div class="info-title">计算费用</div>
        <el-form :model="null" label-width="100px" size="mini" :disabled="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="体积重（g）">
                <el-input v-model="volumeWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计费重（g）">
                <el-input v-model="chargedWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="头程空运">
                <el-input v-model="firstVesselAirTransportFee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="头程海运">
                <el-input v-model="firstVesselSeaTransportFee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="calc-profit">
        <div class="info-title">计算利润</div>
        <el-table :data="profitList" border size="mini" :header-cell-style="{ 'background-color': 'black', color: '#fff' }" :cell-style="columnStyle">
          <el-table-column prop="quantity" label="购买数量" align="center" width="79px"> </el-table-column>
          <el-table-column v-for="num in 3" :key="num">
            <template slot="header" slot-scope="scope">
              <div class="pricing-table-header">
                <div class="pricing-table-header-top">
                  <div>{{ scope.$index }}PC核价</div>
                  <el-input-number
                    v-model.number="priceList[scope.$index - 1].pricing"
                    size="mini"
                    :controls="false"
                    :placeholder="`${scope.$index}PC核价`"
                    style="width: 50%; margin-right: 10px"
                    @change="handleChangePriceInput(scope.$index - 1)"
                  />
                </div>
                <div>用户购买价格: ${{ priceList[scope.$index - 1].purchasePrice }}</div>
              </div>
            </template>
            <el-table-column :prop="`logisticsExpense_${num}PC`" label="物流费" align="center" width="68px"></el-table-column>
            <el-table-column :prop="`airFreightProfit_${num}PC`" label="空运利润" align="center" width="76px"></el-table-column>
            <el-table-column :prop="`seaFreightProfit_${num}PC`" label="海运利润" align="center" width="76px"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      productInfo: {
        cost: 8.5,
        sensitivity: 0,
        actualWeight: 120,
        extent: 5,
        width: 5,
        height: 4,
      },
      baseInfo: [
        {
          startOperatingFee: 0.2,
          endOperatingFee: 0.2,
          subsidy: 2.99,
          normalAirTransportFee: 50,
          specialAirTransportFee: 55,
          normalSeaTransportFee: 11,
          specialSeaTransportFee: 11,
          dollarCurrencyRate: 7.2,
        },
      ],
      tailQuoteList: [
        {
          metricWeight: 28,
          deliveryCharge: 3.73,
        },
        {
          metricWeight: 56,
          deliveryCharge: 3.764,
        },
        {
          metricWeight: 85,
          deliveryCharge: 3.786,
        },
        {
          metricWeight: 113,
          deliveryCharge: 3.804,
        },
        {
          metricWeight: 141,
          deliveryCharge: 4.202,
        },
        {
          metricWeight: 170,
          deliveryCharge: 4.276,
        },
        {
          metricWeight: 198,
          deliveryCharge: 4.354,
        },
        {
          metricWeight: 226,
          deliveryCharge: 4.432,
        },
        {
          metricWeight: 255,
          deliveryCharge: 4.978,
        },
        {
          metricWeight: 283,
          deliveryCharge: 5.074,
        },
        {
          metricWeight: 311,
          deliveryCharge: 5.17,
        },
        {
          metricWeight: 340,
          deliveryCharge: 5.244,
        },
        {
          metricWeight: 368,
          deliveryCharge: 5.596,
        },
        {
          metricWeight: 396,
          deliveryCharge: 5.596,
        },
        {
          metricWeight: 425,
          deliveryCharge: 5.596,
        },
        {
          metricWeight: 453,
          deliveryCharge: 5.596,
        },
        {
          metricWeight: 906,
          deliveryCharge: 6.42,
        },
        {
          metricWeight: 1359,
          deliveryCharge: 7.074,
        },
        {
          metricWeight: 1812,
          deliveryCharge: 7.73,
        },
        {
          metricWeight: 2265,
          deliveryCharge: 8.344,
        },
        {
          metricWeight: 2718,
          deliveryCharge: 9.52,
        },
        {
          metricWeight: 3171,
          deliveryCharge: 10.176,
        },
        {
          metricWeight: 3624,
          deliveryCharge: 10.844,
        },
        {
          metricWeight: 4077,
          deliveryCharge: 11.568,
        },
        {
          metricWeight: 4530,
          deliveryCharge: 12.382,
        },
      ],
      priceList: [
        {
          pricing: 33,
          purchasePrice: 0,
        },
        {
          pricing: 30,
          purchasePrice: 0,
        },
        {
          pricing: 50,
          purchasePrice: 0,
        },
      ],
      port: null,
    };
  },
  computed: {
    volumeWeight() {
      return Number(((this.productInfo.extent * this.productInfo.width * this.productInfo.height) / 6).toFixed(2));
    },
    chargedWeight() {
      return Number(Math.max(this.productInfo.actualWeight, this.volumeWeight).toFixed(2));
    },
    firstVesselAirTransportFee() {
      return Number(
        (
          (this.chargedWeight / 1000) *
          (this.productInfo.sensitivity === 0 ? this.baseInfo[0].normalAirTransportFee : this.baseInfo[0].specialAirTransportFee)
        ).toFixed(2)
      );
    },
    firstVesselSeaTransportFee() {
      return Number(
        (
          (this.chargedWeight / 1000) *
          (this.productInfo.sensitivity === 0 ? this.baseInfo[0].normalSeaTransportFee : this.baseInfo[0].specialSeaTransportFee)
        ).toFixed(2)
      );
    },
    profitList() {
      let list = [];
      for (let i = 0; i < 9; i++) {
        let quantity = i + 1;
        list.push({ quantity });
        for (let j = 0; j < 3; j++) {
          let PC_NUM = j + 1;
          let tailQuoteItem = this.tailQuoteList.find((item) => this.chargedWeight * quantity * PC_NUM < item.metricWeight);

          let logisticsExpense = tailQuoteItem ? tailQuoteItem.deliveryCharge : "错误";
          list[i][`logisticsExpense_${PC_NUM}PC`] = logisticsExpense;

          let profit_1Part =
            quantity * this.priceList[j].pricing +
            (quantity * this.priceList[j].purchasePrice < 30 ? this.baseInfo[0].subsidy : 0) * this.baseInfo[0].dollarCurrencyRate;

          let profit_2Part = quantity * this.productInfo.cost * PC_NUM;

          let profit_AirPart = quantity * this.firstVesselAirTransportFee * PC_NUM;

          let profit_SeaPart = quantity * this.firstVesselSeaTransportFee * PC_NUM;

          let profit_4Part = typeof logisticsExpense === "string" ? "错误" : logisticsExpense * this.baseInfo[0].dollarCurrencyRate;

          let profit_5Part = (this.baseInfo[0].startOperatingFee + this.baseInfo[0].endOperatingFee) * this.baseInfo[0].dollarCurrencyRate * quantity;

          if (typeof profit_4Part === "string") {
            list[i][`airFreightProfit_${PC_NUM}PC`] = profit_4Part;
            list[i][`seaFreightProfit_${PC_NUM}PC`] = profit_4Part;
          } else {
            list[i][`airFreightProfit_${PC_NUM}PC`] = Number((profit_1Part - profit_2Part - profit_AirPart - profit_4Part - profit_5Part).toFixed(2));
            list[i][`seaFreightProfit_${PC_NUM}PC`] = Number((profit_1Part - profit_2Part - profit_SeaPart - profit_4Part - profit_5Part).toFixed(2));
          }
        }
      }
      return list;
    },
  },
  methods: {
    handleChangePriceInput(index) {
      this.priceList[index].purchasePrice = Number(((this.priceList[index].pricing * 1.2) / this.baseInfo[0].dollarCurrencyRate).toFixed(2));
    },
    columnStyle(data) {
      const { row, column, columnIndex } = data;
      if (columnIndex === 1 || columnIndex === 4 || columnIndex === 7) return "background:	#FFF8DC;";
      else if (row[column.property] < 0) return "background:	#F89898;";
    },
  },
  beforeMount() {
    // eslint-disable-next-line no-undef
    this.port = chrome.runtime.connect({ name: "quote-calc" });
    this.port.onMessage.addListener((value) => {
      if (value) {
        this.productInfo = value.productInfo;
        this.baseInfo = value.baseInfo;
        this.priceList = value.priceList;
      }
      this.priceList.forEach((_, index) => this.handleChangePriceInput(index));
    });
    this.port.postMessage({ type: "get" });
  },
  updated() {
    this.port.postMessage({ type: "set", productInfo: this.productInfo, baseInfo: this.baseInfo, priceList: this.priceList });
  },
};
</script>

<style scoped>
.main {
  width: 740px;
  height: 560px;
  box-sizing: content-box;
  padding: 10px 20px;
}

.title {
  font-size: 18px;
  text-align: center;
  margin: 5px 0;
  font-weight: bold;
}

.info-title {
  font-size: 14px;
  margin: 5px;
}

.pricing-table-header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.pricing-table-header-top {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

::v-deep .el-input__inner {
  padding: 0 5px;
}

::v-deep .el-divider {
  margin: 12px 0;
}
</style>
