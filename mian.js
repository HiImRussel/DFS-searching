let points = {
    A: {
        is_visited: false,
        connected: ["B", "F"],
    },
    B: {
        is_visited: false,
        connected: ["C"],
    },
    C: {
        is_visited: false,
        connected: ["E"],
    },
    D: {
        is_visited: false,
        connected: ["C"],
    },
    E: {
        is_visited: false,
        connected: ["A", "F"],
    },
    F: {
        is_visited: false,
        connected: ["D"],
    },
};

let paths = [[]];

const DFS = (current, search_value, generation) => {
    if (points[current].is_visited) return;

    paths[generation].push(current);
    points[current].is_visited = true;

    if (current === search_value) return;

    const have_more_connections = points[current].connected.length > 1;
    const current_elements = JSON.parse(JSON.stringify(points));

    points[current].connected.forEach((point) => {
        points = { ...current_elements };

        if (have_more_connections) {
            paths.push([...paths[generation]]);
        }

        DFS(point, search_value, paths.length - 1);
    });
};

const start_value = "A";
const search_value = "D";

DFS(start_value, search_value, 0);

const final_paths = paths.filter((path) => path.at(-1) === search_value);
const shortest_path = final_paths.reduce((prev, next) =>
    prev.length > next.length ? next : prev
);

document.getElementById("app").innerText = `Shortest path: ${shortest_path.join(
    " "
)}`;
