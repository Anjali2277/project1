class Node:
    def __init__(self, state, parent, cost, heuristic):
        self.state = state
        self.parent = parent
        self.cost = cost
        self.heuristic = heuristic
        self.f = cost + heuristic

def ida_star(start, goal, graph, heuristic):
    def search(path, g, bound):
        node = path[-1]
        f = g + heuristic[node.state]
        if f > bound:
            return f
        if node.state == goal:
            return node
        min_bound = float('inf')
        for neighbor, cost in graph[node.state]:
            if neighbor not in [n.state for n in path]:
                new_node = Node(neighbor, node, node.cost + cost, heuristic[neighbor])
                path.append(new_node)
                result = search(path, g + cost, bound)
                if isinstance(result, Node):
                    return result
                min_bound = min(min_bound, result)
                path.pop()
        return min_bound

    bound = heuristic[start]
    path = [Node(start, None, 0, heuristic[start])]
    while True:
        result = search(path, 0, bound)
        if isinstance(result, Node):
            return result
        if result == float('inf'):
            return None
        bound = result

# Example graph and heuristic for Romania
graph = {
    'Arad': [('Zerind', 75), ('Timisoara', 118), ('Sibiu', 140)],
    'Zerind': [('Oradea', 71), ('Arad', 75)],
    # Add the rest of the graph as needed
}
heuristic = {'Arad': 366, 'Zerind': 374, 'Timisoara': 329, 'Sibiu': 253, 'Oradea': 380}
result = ida_star('Arad', 'Bucharest', graph, heuristic)
if result:
    print("Path found:", result.state)
else:
    print("No path found.")
