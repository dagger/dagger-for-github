package main

import (
	"context"
	"dagger/dagger-for-github/internal/dagger"
	"fmt"
	"strings"

	"github.com/vmware-labs/yaml-jsonpath/pkg/yamlpath"
	"golang.org/x/mod/semver"
	"gopkg.in/yaml.v3"
)

type DaggerForGithub struct {
	Source *dagger.Directory
}

func New(
	// +optional
	// +defaultPath="/"
	source *dagger.Directory,
) *DaggerForGithub {
	return &DaggerForGithub{
		Source: source,
	}
}

// Bump bumps all action files to a specified version
func (m *DaggerForGithub) Bump(ctx context.Context, version string) (*dagger.Directory, error) {
	if !semver.IsValid(version) {
		return nil, fmt.Errorf("invalid version %q", version)
	}
	newVersion := strings.TrimPrefix(version, "v")

	oldVersion, err := findOldVersion(ctx, m.Source.File("action.yml"))
	if err != nil {
		return nil, err
	}

	return replaceVersions(ctx, m.Source, oldVersion, newVersion, []string{"action.yml", "README.md"})
}

// findOldVersion extracts the old version we were using from action.yml
func findOldVersion(ctx context.Context, actionyml *dagger.File) (string, error) {
	contents, err := actionyml.Contents(ctx)
	if err != nil {
		return "", err
	}

	var node yaml.Node
	err = yaml.Unmarshal([]byte(contents), &node)
	if err != nil {
		return "", err
	}

	pathsrc := "$.inputs.version.default"
	path, err := yamlpath.NewPath(pathsrc)
	if err != nil {
		return "", err
	}
	nodes, err := path.Find(&node)
	if err != nil {
		return "", err
	}
	if len(nodes) == 0 {
		return "", fmt.Errorf("could not find %q", pathsrc)
	}
	version := nodes[0].Value
	return version, nil
}

// replaceVersions performs a find-replace to update versions in the specified paths
func replaceVersions(ctx context.Context, dir *dagger.Directory, oldVersion string, newVersion string, paths []string) (*dagger.Directory, error) {
	result := dag.Directory()
	for _, path := range paths {
		contents, err := dir.File(path).Contents(ctx)
		if err != nil {
			return nil, err
		}
		contents = strings.ReplaceAll(contents, `"`+oldVersion+`"`, `"`+newVersion+`"`)
		contents = strings.ReplaceAll(contents, `'`+oldVersion+`'`, `'`+newVersion+`'`)
		result = result.WithNewFile(path, contents)
	}
	return result, nil
}
