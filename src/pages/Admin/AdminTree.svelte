<script lang="ts">
    import AdminDetail from "components/AdminList/Modal/AdminDetail.svelte";
    import AdminInfo from "components/AdminTree/AdminInfo.svelte";
    import TreeList from "components/AdminTree/TreeList.svelte";
    import Modal from "utils/Modal.svelte";
    import { got } from "utils/helpers";

    let treeStructure: Array<any>;
    let adminInfo: any;
    let detailVisible: boolean = false;

    const init = () => {
        handleGetTreeList()
    }

    const handleDetailVisible = () => {
        detailVisible = !detailVisible
    }

    const handleGetTreeList = async () => {
        const response = await got("/admin/tree");
        if(response.status == 1) {
            
            treeStructure = [response.data];
        };
    };

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
    <AdminDetail handleDetailVisible={handleDetailVisible} {adminInfo} handleGetList={null}/>
</Modal>

<style lang="scss">
    @import "../../styles/card.scss";
    @import "./AdminTree.scss";
</style>