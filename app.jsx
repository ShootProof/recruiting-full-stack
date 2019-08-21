class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoading: false,
            nodes: [],
            settings: []
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        fetch('getData.php')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoading: false,
                        nodes: result.nodes,
                        settings: result.settings
                    });
                },
                error => {
                    this.setState({
                        error: error,
                        isLoading: false
                    });
                }
            );
    }

    render() {
        const { error, isLoading, nodes, settings } = this.state;

        if (error) {
            return (
                <div>There was an error loading the tree</div>,
                <p>{error.message}</p>
            );
        } else if (isLoading) {
            return <div>Loading...</div>;
        } else if (nodes && settings) {
            return (
                <ul className="tree">
                    {nodes.map(node => (
                        <li key={node.id}>
                            {node.name}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return 'Not loading or error';
        }
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('app-tree')
);