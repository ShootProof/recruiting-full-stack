<?php

class Thumbnail {
    /** @var string $description */
    public $description;

    /** @var string $href */
    public $href;

    /**
     * @param string $description
     * @param string $href
     */
    public function __construct(string $description, string $href) {
        $this->description = $description;
        $this->href = $href;
    }
}

class Node {
    /** @var int $id */
    public $id;

    /** @var string $name */
    public $name;

    /** @var Thumbnail $thumbnail */
    public $thumbnail;

    /** @var Node[]|null $children */
    public $children;

    /** @var bool $collapsed */
    public $collapsed;

    /** @var int|null $parentId */
    private $parentId;

    /**
     * @param int $id
     * @param string $name
     * @param Thumbnail $thumbnail
     * @param bool $collapsed
     * @param int|null $parentId
     */
    public function __construct(int $id, string $name, Thumbnail $thumbnail, $collapsed, $parentId = null) {
        $this->id = $id;
        $this->name = $name;
        $this->thumbnail = $thumbnail;
        $this->collapsed = $collapsed;
        $this->parentId = $parentId;
    }

    /**
     * @param Node $node
     */
    public function addChild(Node $node): void {
        $this->children[] = $node;
    }

    /**
     * @return bool
     */
    public function isChild(): bool {
        return $this->parentId !== null;
    }

    /**
     * @return int|null
     */
    public function getParentId(): ?int {
        return $this->parentId;
    }
} 

class Setting {
    /** @var int $id */
    public $id;

    /** @var string $name */
    public $name;

    /** @var mixed $value */
    public $value;

    /**
     * @param string $name
     * @param mixed $value
     */
    public function __construct(int $id, string $name, $value) {
        $this->id = $id;
        $this->name = $name;
        $this->value = $value;
    }
}

class GetDataResponse {
    /** @var Node[] $nodes */
    public $nodes;

    /** @var Setting[] $settings */
    public $settings;

    /**
     * @param Node[] $nodes
     * @param Setting[] $settings
     */
    public function __construct(array $nodes, array $settings) {
        $this->nodes = $nodes;
        $this->settings = $settings;
    }
}

/**
 * @param Node[] $nodes
 * @param Node $node
 */
function assignToParent(array $nodes, Node $node): void {
    foreach ($nodes as $parent) {
        if ($parent->id === $node->getParentId()) {
            $parent->children[] = $node;

            break;
        } else if ($parent->children) {
            assignToParent($parent->children, $node);
        }
    }
}

/** @var array $testData */
$testData = json_decode(file_get_contents("testdata.json"));

/** @var Node[] $nodes */
$nodes = [];

/** @var Setting[] $settings */
$settings = [];

foreach ($testData->nodes as $node) {
    $thumbnail = new Thumbnail($node->thumbnail->description, $node->thumbnail->href);
    $collapsed = $node->collapsed ?? false;
    $newNode = new Node($node->id, $node->name, $thumbnail, $collapsed, $node->parent);

    if ($newNode->isChild()) {
        assignToParent($nodes, $newNode);

        continue;
    }
    
    $nodes[] = $newNode;
}

foreach ($testData->settings as $setting) {
    $settings[] = new Setting($setting->id, $setting->name, $setting->value);
}

$getDataResponse = new GetDataResponse($nodes, $settings);

header('Content-Type: application/json');

echo json_encode($getDataResponse);