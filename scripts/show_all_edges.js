edge_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list.txt';
edge_list_dist_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/edge_list_dist.txt';
node_list_url = 'http://fahimcsebuet.github.io/thesis_javascript/graph/node_list.txt';

function show_all_edges(map){

    $(".loader").show();
	$("#loading").show();
	$("#fail").hide();
	$("#success").hide();
	$("#info").html("Running...");
	started_time = new Date().getTime();
	
	//load_graph(edge_list_url,node_list_url,map,simple_dijkstra_end);
    load_graph(edge_list_dist_url,node_list_url,map,show_all_edges_end);
}

function show_all_edges_end(graph,map){
	

	all_path_shower(graph,map);
	$("#loading").hide();
	$("#success").show();
	
	
	ended_time = new Date().getTime();
	time_taken = ended_time-started_time;
	$("#info").html("Time:"+time_taken+"ms");
	console.log("Time taken = " + time_taken + "ms");
	
}

function all_path_shower(graph,map){
	visited_dfs = [];
	con = 0;
	for (var k in graph.nodes_point){
		if (typeof graph.nodes_point[k] !== 'function' && typeof graph.nodes[k] != 'undefined') {
			 //alert("Key is " + k + ", value is" + target[k]);
			 path_shower(graph,map,[k]);
			 
		}
	}
}


function path_shower(graph,map,paths){
	
	new_node = paths[paths.length-1];
	visited_dfs[new_node] = true;
	cc = 0;
	for(i=0;i< graph.nodes[new_node].length;i++){
		c_node = graph.nodes[new_node][i].end;
		if(typeof visited_dfs[c_node]=='undefined'){
			na = paths.concat([c_node]);
			path_shower(graph,map,na);
			cc++;
		}
	}
	
	if(cc == 0 && paths.length > 10){
		con++;
		//console.log(con);
		//console.log(paths);
		dp = graph.getDataPath(paths);
		map.plotResult(dp,map.getSampleStyle());
		map.addMarker(graph.nodes_point[new_node].lon,graph.nodes_point[new_node].lat);
		map.addMarker(graph.nodes_point[paths[0]].lon,graph.nodes_point[paths[0]].lat);
	}
	
	return;

}