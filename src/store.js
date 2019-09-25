import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arTableFields: ['Run', 'Cases', 'Blocks', 'Slides'],
    arTableItems: [],
    //  Prod
    //  apiURL: 'http://10.24.4.9:2081',
    //  Test
    //  apiURL: 'http://10.24.4.9:2082',
    //  Local Test
    apiURL: 'http://localhost:2081',
    strSlideDistLoc: null

  },
  mutations: {
    ClearArTableItems (state) {
      state.arTableItems = []
    },
    ClearStrSlideDistLoc (state) {
      state.strSlideDistLoc = null
    },
    PushArTableItems (state, objTmp) {
      state.arTableItems.push(objTmp)
    },
    SetStrSlideDistLoc (state, objTmp) {
      state.strSlideDistLoc = objTmp
    }
  },
  actions: {
    LoadCaseBlockSlideCountTableData ({ commit }, strLocationHash) {
      return new Promise((resolve, reject) => {
        let strFullAPICall = this.state.apiURL + '/caseblockslidecount'
        console.log('Hello LoadBlockCountTableData')
        console.log(strFullAPICall)
        console.log('APIHash')
        console.log(strLocationHash)
        axios.post(strFullAPICall, {
          URLHASH: strLocationHash
        })
          .then(function (response) {
            // Clear table data
            commit('ClearArTableItems')
            commit('ClearStrSlideDistLoc')
            console.log()
            console.log(response)
            let strLocation = String(response.data[0]).replace('LOCN', '')
            console.log('strLocation:')
            console.log(strLocation)
            commit('SetStrSlideDistLoc', String(response.data[0]).replace('LOCN', ''))
            // response.data.shift()
            var jsnData = JSON.stringify(response.data)
            console.log(jsnData)

            console.log('Json Test')
            var tmpJSON = JSON.parse(jsnData)
            console.log(tmpJSON)
            console.log(tmpJSON.FirstRunCaseCount)
            let strResponseJSON = ''
            // strResponseJSON = response.data[0].FirstRunCaseCount
            let temp = {}
            temp = response.data
            
            // Run 1
            commit('PushArTableItems', { isActive: false, Run: 1, Cases: temp[1][0].FirstRunCaseCount, Blocks: temp[2][0].FirstRunBlockCount, Slides: temp[3][0].FirstRunSlideCount })
            // Run 2
            commit('PushArTableItems', { isActive: false, Run: 2, Cases: temp[4][0].SecondRunCaseCount, Blocks: temp[5][0].SecondRunBlockCount, Slides: temp[6][0].SecondRunSlideCount })
            // Run 3
            commit('PushArTableItems', { isActive: false, Run: 3, Cases: temp[7][0].ThirdRunCaseCount, Blocks: temp[8][0].ThirdRunBlockCount, Slides: temp[9][0].ThirdRunSlideCount })
            // Run 4
            commit('PushArTableItems', { isActive: false, Run: 4, Cases: temp[10][0].FourthRunCaseCount, Blocks: temp[11][0].FourthRunBlockCount, Slides: temp[12][0].FourthRunSlideCount })
            // Total
            commit('PushArTableItems', { isActive: false, Run: 'All Runs', Cases: temp[13][0].TotalRunCaseCount, Blocks: temp[14][0].TotalRunBlockCount, Slides: temp[15][0].TotalRunSlideCount })

            // console.log('Response.dataobj')
            // console.log(temp)
            // console.log(temp[0][0].FirstRunCaseCount)
            /*
            let strFirstRunCaseCount = ''
            let strSecondRunCaseCount = ''
            let strThirdRunCaseCount = ''
            let strFourthRunCaseCount = ''
            let strTotalCaseCount = ''

            let strFirstRunBlockCount = ''
            let strSecondRunBlockCount = ''
            let strThirdRunBlockCount = ''
            let strFourthRunBlockCount = ''
            let strTotalBlockCount = ''

            let strFirstRunSlideCount = ''
            let strSecondRunSlideCount = ''
            let strThirdRunSlideCount = ''
            let strFourthRunSlideCount = ''
            let strTotalSlideCount = ''
            */

            // BlockCount Array
            // Run 1 - 0 [Run, CaseCount,BlockCount,SlideCount]
            


            // console.log(arBlockCount)

            for (var i = 0; i < response.data.length; i++) {
              // strResponseJSON += String(response.data[i][0])

              if (temp[i][0].FirstRunCaseCount) {
                strFirstRunCaseCount = temp[i][0].FirstRunCaseCount
              } else if (temp[i][0].FirstRunBlockCount) {
                strFirstRunBlockCount = temp[i][0].FirstRunBlockCount
              }

              
              // Build Chart Data Array
              /*switch (i) {
                case 1:
                  commit('PushArTableItems', { isActive: false, Run: strLocation, Cases: response.data[i].BlockCount, Blocks: 1, Slides: 2 })
                  break
                case 2:
                  break
                default:
                  break
              }*/
              // console.log('Json Test')
              //  console.log(response.data.ThirdRunCaseCount)

              //commit('PushArTableItems', { isActive: false, Run: strLocation, Cases: response.data[i].BlockCount, Blocks: 1, Slides: 2 })
              //  commit('PushBlockCountTableItems', { isActive: false, location: response.data[i].LocAbbr, FirstRunBlockCount: response.data[i].FirstRunBlockCount, SecondRunBlockCount: response.data[i].SecondRunBlockCount, ThirdRunBlockCount: response.data[i].ThirdRunBlockCount, FourthRunBlockCount: response.data[i].FourthRunBlockCount, TotalBlockCount: response.data[i].TotalBlockCount })
            } // end for

            // console.log(strResponseJSON)
            // Set Chart Collection Object
            // commit('SetChartDataCollection', 'Blocks Cut', '#f87979')
            console.log('done test')
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
        console.log('promise done')
      })
    }
  },
  getters: {
    TableFields: (state, getters) => {
      return state.arTableFields
    },
    TableItems: (state, getters) => {
      return state.arTableItems
    }
  }
})
