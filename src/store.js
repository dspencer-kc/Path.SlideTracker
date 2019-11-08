import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
var EnvVar = require('./.env.local')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arTableFields: ['Run', 'Cases', 'Blocks', 'Slides'],
    arTableItems: [],
    arSlideDetailsTableFields: ['Marked_Ready_for_Courier', 'Slide_ID', 'Stain', 'Slide_Tray'],
    arSlideDetailsTableItems: [],
    apiURL: EnvVar.apiURL,
    apitoken: EnvVar.apitoken,
    strSlideDistLoc: null
    // arTableFieldsAllLoc: ['Location', 'Run', 'Cases', 'Blocks', 'Slides'],
    // arTableItemsAllLoc: []

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
    ClearArSlideDetailsTableItems (state) {
      state.arSlideDetailsTableItems = []
    },
    PushArSlideDetailsTableItems (state, objTmp) {
      state.arSlideDetailsTableItems.push(objTmp)
    },
    SetStrSlideDistLoc (state, objTmp) {
      state.strSlideDistLoc = objTmp
    },
    SetarTableFields (state, objTmp) {
      state.arTableFields = objTmp
    }
  },
  actions: {
    LoadCaseBlockSlideCountTableData ({ commit }, strLocationHash) {
      return new Promise((resolve, reject) => {
        let strFullAPICall = this.state.apiURL + '/caseblockslidecount'
        // console.log('Hello LoadBlockCountTableData')
        // console.log(strFullAPICall)
        // console.log('APIHash')
        // console.log(strLocationHash)
        axios.post(strFullAPICall, {
          URLHASH: strLocationHash,
          apitoken: this.state.apitoken
        })
          .then(function (response) {
            // Clear table data
            commit('ClearArTableItems')
            commit('ClearStrSlideDistLoc')
            commit('SetStrSlideDistLoc', String(response.data[0]).replace('LOCN', ''))

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
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
        console.log('promise done')
      })
    },
    LoadSlideDetailsTableData ({ commit }, strLocationHash) {
      // console.log('Hello load slide details table Data')
      return new Promise((resolve, reject) => {
        let strFullAPICall = this.state.apiURL + '/caseblockslidecountdetails'
        console.log('Hello LoadBlockCountTableData')
        console.log(strFullAPICall)
        console.log(this.state.strSlideDistLoc)
        axios.post(strFullAPICall, {
          SLIDEDISTLOCID: this.state.strSlideDistLoc,
          apitoken: this.state.apitoken
        })
          .then(function (response) {
            // Clear table data
            commit('ClearArSlideDetailsTableItems')
            // console.log('Response:')
            // console.log(response)
            // strResponseJSON = response.data[0].FirstRunCaseCount
            let temp = {}
            temp = response.data

            for (var i = 0; i < response.data.length; i++) {
              let strSlideID = temp[i].SlideID
              let strSlideTray = temp[i].SlideTray
              let dtRdyForCourier = new Date(temp[i].DTReadyForCourier)
              let intMinutes = dtRdyForCourier.getMinutes()
              let strMinutes = ''
              if (intMinutes <= 9) {
                strMinutes = '0' + intMinutes
              } else {
                strMinutes = intMinutes
              }
              // let strFormattedDate = dtRdyForCourier.format('hh:mm mm/dd/yy')
              let strFormattedDate = (dtRdyForCourier.getMonth() + 1) + '-' + dtRdyForCourier.getDate() + '-' + dtRdyForCourier.getFullYear() + ' ' + dtRdyForCourier.getHours() + ':' + strMinutes
              console.log(strFormattedDate)
              // let strDTReadyForCourier = temp[i].DTReadyForCourier
              strSlideID = strSlideID.replace('HSLD', '')
              strSlideTray = strSlideTray.replace('SLTR', '')

              // commit('PushArSlideDetailsTableItems', { isActive: false, Marked_Ready_for_Courier: temp[i][0].FirstRunCaseCount, Slide_ID: temp[i][0].FirstRunCaseCount, Stain: temp[2][0].FirstRunBlockCount, Slide_Tray: temp[3][0].FirstRunSlideCount })
              commit('PushArSlideDetailsTableItems', { isActive: false, Marked_Ready_for_Courier: strFormattedDate, Slide_ID: strSlideID, Stain: temp[i].StainLabel, Slide_Tray: strSlideTray })
              // console.log(i)
            } // end for
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    LoadAllLocBlockCountTableData ({ commit }, strLocationHash) {
      return new Promise((resolve, reject) => {
        let strFullAPICall = this.state.apiURL + '/caseblockslidecount'
        let arTemp = ['Location', '_1st_Run_Blocks', '_2nd_Run_Blocks', '_3rd_Run_Blocks', '_4th_Run_Blocks', 'Total_Blocks']
        commit('SetarTableFields', arTemp)
        // console.log('Hello LoadBlockCountTableData')
        // console.log(strFullAPICall)
        // console.log('APIHash')
        // console.log(strLocationHash)
        //
        // Hard Coded master location hash
        axios.post(strFullAPICall, {
          URLHASH: '063d01cd',
          apitoken: this.state.apitoken
        })
          .then(function (response) {
            // Clear table data
            commit('ClearArTableItems')

            let temp = {}
            temp = response.data

            // console.log('Load All Loc BLock Count Response')
            // console.log(temp)
            for (var i = 1; i < response.data.length; i++) {
              // Build Chart Data Array
              commit('PushArTableItems', { isActive: false, Location: temp[i].LocAbbr, _1st_Run_Blocks: temp[i].FirstRunBlockCount, _2nd_Run_Blocks: temp[i].SecondRunBlockCount, _3rd_Run_Blocks: temp[i].ThirdRunBlockCount, _4th_Run_Blocks: temp[i].FourthRunBlockCount, Total_Blocks: temp[i].TotalBlockCount }) } // end for
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
        console.log('promise done')
      })
    },
    AssignSlideDistrLoc ({ commit }, strLocation) {
      console.log('Hello AssignSlideDistrLoc')
      commit('SetStrSlideDistLoc', strLocation)
    }
  },
  getters: {
    TableFields: (state, getters) => {
      return state.arTableFields
    },
    TableItems: (state, getters) => {
      return state.arTableItems
    },
    SlideDetailsTableFields: (state, getters) => {
      return state.arSlideDetailsTableFields
    },
    SlideDetailsTableItems: (state, getters) => {
      return state.arSlideDetailsTableItems
    },
    SlideDistLoc: (state, getters) => {
      return state.strSlideDistLoc
    }
  },
  functions: {
    appendLeadingZeroes (n) {
      if (n <= 9) {
        return '0' + n
      }
      return n
    }
  }
})
