<script lang="ts">
    import AdminDetail from "components/AdminList/Modal/AdminDetail.svelte";
    import AdminInfo from "components/AdminTree/AdminInfo.svelte";
    import TreeList from "components/AdminTree/TreeList.svelte";
    import Modal from "utils/Modal.svelte";
    import { got } from "utils/helpers";

    let treeStructure: Array<any>;
    let adminInfo: any;
    let detailVisible: boolean = false;

    const init = async () => {
        await handleGetTreeList()
    }

    const handleDetailVisible = () => {
        detailVisible = !detailVisible
    }

    const handleGetTreeList = async () => {
        const response = await got("/admin/tree");
        if(response.status == 1) {
            treeStructure = [response.data];

            adminInfo
            ? updateAdminInfo(treeStructure)
            : adminInfo = treeStructure[0];
        };
    };

    const updateAdminInfo = (structure: Array<any>) => {
        structure.map((item)=>{
            if(item["id"] == adminInfo["id"]) {
                adminInfo = item
                return;
            }
            if (item["children"]) {
                updateAdminInfo(item["children"])
            }
        })
    }

    const handleSelectAdmin = (setAdminInfo: Array<any>) => {
        adminInfo = setAdminInfo;
    };

    init()
</script>

<div class="content admin-tree">
    <div class="card tree-structure">
        <TreeList {treeStructure} {handleSelectAdmin}/>
    </div>
    <div class="card admin-info">
        <AdminInfo {adminInfo} {handleDetailVisible}/>
    </div>
</div>

<Modal visible={detailVisible} handleVisible={handleDetailVisible} title={"에이전트 상세정보"} >
    <AdminDetail handleVisible={handleDetailVisible} {adminInfo} handleGetList={handleGetTreeList}/>
</Modal>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./AdminTree.scss";
</style>