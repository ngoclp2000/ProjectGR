import FilterType from "@/shared/enum/FilterType";


export const useFunctionCommon = () => {
    function list_to_tree(list,key,parentId) {
        var map = {},
            node, roots = [],
            i;

        for (i = 0; i < list.length; i += 1) {
            let ele = list[i];
            map[ele[key]] = i; // initialize the map
            list[i].children = []; // initialize the children
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node[parentId] != null) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node[parentId]]].children.push(node);
            } else {
                node.isParent = true;
                roots.push(node);
            }
        }
        return roots;
    }

    function handleFilterType(filter){
        if(filter){
            switch(filter.type){
                case FilterType.Tree:
                    filter.type = "TreeFilter";
                    return list_to_tree(filter.data,filter.id,filter.parentId);
                case FilterType.Range:
                    filter.type = "RangeFilter";
                    return filter.data;
                case FilterType.Rate:
                    filter.type = "StarFilter";
                    filter.data = 0;
                    return filter.data;
            }
        }
    }

    return {
        list_to_tree,
        handleFilterType
    }
}