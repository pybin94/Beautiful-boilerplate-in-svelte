<script lang="ts">
    import { userListTitle } from "constants/userList";
    import { onMount } from "svelte";
    import { got } from "utils/helpers";

    let page: number = 0;
    let limit: number = 1;
    let offset: number = limit * page;
    let search: any;
    let userList: Array<object>;
    let pagenation: number = 1;

    const getUserList = async (setPage: number = 0) => {
        page = setPage
        offset = limit * (page);

        let params = {
            limit,
            offset
        }

        const response = await got("/user/users", "POST", params)

        if(response.status == 1) {
            userList = response.data.list
            pagenation = Math.ceil(response.data.total / limit)
        };
    }
    getUserList()
</script>

<form class="search-form" on:submit|preventDefault={null}>
    <select bind:value={limit} on:change={()=>{getUserList()}}>
        <option selected value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
    </select>
    <div class="input-form">
        <label for="searchInput">유저 아이디</label>
        <input id="searchInput" type="text">
        <button>검색</button>
    </div>
</form>
<div class="table">
    <table>
        <thead>
            <tr>
                {#each userListTitle as item}
                    <th>{item}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if userList}
                {#each userList as item, index}
                    <tr>
                        <td>{index}</td>
                        <td>{item["identity"]}</td>
                        <td>{item["user_name"]}</td>
                        <td>{item["set1"]}</td>
                        <td>{item["set2"]}</td>
                        <td>{item["set3"]}</td>
                        <td>{item["set4"]}</td>
                        <td>{item["created_at"]}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
<div class="pagenation">
    {#if pagenation}
        <ul>
        <!-- {#if page === pagenation} -->
            <li class="shift first">
                <a href={"#"} class="{page >= 1 ? "active" : ""}" on:click={ page >= 1 ? ()=>{getUserList(0)} : null}>
                    <i class="fa-solid fa-angles-left"></i>
                </a>
            </li>
            <li class="shift">
                <a href={"#"} class="{page >= 1 ? "active" : ""}" on:click={ page >= 1 ? ()=>{getUserList(page-1)} : null}>
                    <i class="fa-solid fa-angle-left"></i>
                </a>
            </li>
            
            {#if page >= 2 }
            <li class="shift">
                <a href={"#"}>
                    <i class="fa-solid fa-ellipsis"></i>
                </a>
            </li>
            {/if}
            <!-- {/if} -->
            {#each {length: pagenation} as _, i}
                <li class="page {page === (i) ? "active" : ""}">
                    <a href={"#"} on:click={()=>{page === (i) ? null : getUserList(i)}}>{i + 1}</a>
                </li>
            {/each}
            {#if pagenation - page >= 3}
            <li class="shift">
                <a href={"#"}><i class="fa-solid fa-ellipsis"></i></a>
            </li>
            {/if}
            <li class="shift">
                <a href={"#"} class="{page < pagenation - 1 ? "active" : ""}" on:click={ page < pagenation-1 ? ()=>{getUserList(page+1)} : null}>
                    <i class="fa-solid fa-chevron-right"></i>
                </a>
            </li>
            <li class="shift last">
                <a href={"#"} class="{page < pagenation - 1 ? "active" : ""}" on:click={ page < pagenation-1 ? ()=>{getUserList(pagenation-1)} : null}>
                    <i class="fa-solid fa-angles-right"></i>
                </a>
            </li>
        </ul>
    {/if}
</div>

<style lang="scss">
    @import "./UserList.scss";
</style>